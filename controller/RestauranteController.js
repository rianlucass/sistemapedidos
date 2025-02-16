import Restaurante from '../models/Restaurante.js'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'
import passport from 'passport'

class RestauranteController {
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
                        req.flash('error_msg', 'Erro ao salvar o restaurante!')
                        res.redirect('/restaurante/cadastrar')
                    }
                    novoRestaurante.senha = hash
                    Restaurante.create(novoRestaurante).then((()=>{
                        req.flash('success_msg', 'Restaurante salvo com sucesso!')
                        res.redirect('/restaurante/login')
                    })).catch((error)=>{
                        req.flash('erro_msg', error.message)
                    })
                })
            })
        }
    } 

    login = (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: 'dashboard',
            failureRedirect: '/restaurante/login',
            failureFlash: true
        })(req, res, next)
    }

    logout = (req, res, next) => {
        req.logout ((erro) =>{
            res.redirect('/restaurante/login')
        })
    }

}

export default new RestauranteController()