import Restaurante from '../models/Restaurante.js'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'
import passport from 'passport'

class RestauranteController {
    /*index = async (req, res)=>{
        const restaurante = await Restaurante.findAll()
        res.render('restaurante/index', {restaurante: restaurante})
    }*/

    cadastrar = async (req, res)=>{
        let restaurante = await Restaurante.findOne({
            where:{
                [Op.or]:[
                    {cnpj: req.body.cnpj},
                    {email: req.body.email}
                ]
            }
        })

        if(restaurante){
            res.redirect('/restaurante/cadastrar')
        } else {
            let novoRestaurante = {
                nome: req.body.nome,
                email: req.body.email,
                cnpj: req.body.cnpj,
                descricao: req.body.descricao,
                login: req.body.email,
                senha: req.body.password,
                categoria: 1, 
                status: 2,
            }

            bcrypt.genSalt(10, (erro, salt)=>{
                bcrypt.hash(novoRestaurante.senha, salt, (err, hash)=>{
                    if(err) {
                        req.flash('error_msg', 'Erro ao criar conta do restaurante!')
                        res.redirect('/restaurante/cadastrar')
                    }
                    novoRestaurante.senha = hash
                    Restaurante.create(novoRestaurante).then((()=>{
                        req.flash('success_msg', 'Conta do restaurante criada com sucesso!')
                        res.redirect('/restaurante/login')
                    })).catch((error)=>{
                        req.flash('erro_msg', error.message)
                    })
                })
            })
        }
    } 

    login = (req, res, next) => {
        passport.authenticate('restaurante-local', (err, restaurante, info)=>{
            if(err){
                return next(err)
            }
            if(!restaurante){
                req.flash("error_msg", info.message || "Credenciais inválidas.")
                return res.redirect('/restaurante/login')
            }
            
            req.logIn(restaurante,(err)=>{
                if(err){
                    return next(err)
                }
                res.redirect('/restaurante/dashboard')
            })
        })(req, res, next)
    }

    logout = (req, res, next) => {
        req.logout ((erro) =>{
            res.redirect('/')
        })
    }

    perfil = async (req, res) => {
        try {
            if (!req.user) {
                return res.redirect('/restaurante/login')
            }
    
            const restaurante = await Restaurante.findByPk(req.user.id)
    
            if (!restaurante) {
                req.flash('error_msg', 'Restaurante não encontrado!')
                return res.redirect('/')
            }
    
            res.render('restaurante/perfil', { restaurante })
        } catch (error) {
            console.error(error)
            req.flash('error_msg', 'Erro ao carregar perfil do restaurante.')
            res.redirect('/')
        }
    }

    atualizarPerfil = async (req, res) => {
        try {
            const restauranteId = req.user.id;
            const restaurante = await Restaurante.findByPk(restauranteId)
    
            if (!restaurante) {
                req.flash('error_msg', 'Restaurante não encontrado!')
                return res.redirect('/restaurante/perfil')
            }

            restaurante.nome = req.body.nome
            restaurante.cnpj = req.body.cnpj
            restaurante.descricao = req.body.descricao
            restaurante.email = req.body.email
    
            if (req.file) {
                if (restaurante.logo) {
                    const oldPath = path.join('public/uploads/restaurante', path.basename(restaurante.logo))
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                }
                restaurante.logo = `/uploads/${req.file.filename}`
            }
    
            await restaurante.save();
    
            req.flash('success_msg', 'Perfil atualizado com sucesso!')
            res.redirect('/restaurante/perfil')
        } catch (error) {
            console.error(error)
            req.flash('error_msg', 'Erro ao atualizar o perfil!')
            res.redirect('/restaurante/perfil')
        }
    }    
}

export default new RestauranteController()