import Pessoa from "../models/Pessoa.js";
import Usuario from "../models/Usuario.js";
import { Op } from "sequelize"; 
import bcrypt from 'bcrypt'

class PessoaController {
    index = (req, res) =>{
        Pessoa.findAll({
            where:{
                status: 1
            },
            order:[['nome', 'asc']],
        }).then((pessoas)=>{
            res.render('usuario/index', {pessoas: pessoas})
        })
    }

    cadastrar = async (req, res)=>{
        let pessoa = await Pessoa.findOne({
            where:{
                [Op.or]:[
                    {cpf: req.body.cpf},
                    {email: req.body.email}
                ]
            }
        })

        if(pessoa){
            res.redirect('/usuario/cadastrar')
        }else{
            let novo = {
                nome: req.body.nome,
                email: req.body.email,
                cpf: req.body.cpf,
                status: 1
            }
            Pessoa.create(novo).then((pessoa)=>{
                let novoUsuario = {
                    login: pessoa.email,
                    senha: req.body.password,
                    categoria: 0,
                    status: 1,
                    pessoa_id: pessoa.id
                }

                bcrypt.genSalt(10, (erro, salt)=>{
                    bcrypt.hash(novoUsuario.senha, salt, (err, hash)=>{
                        if(erro) {
                            req.flash('error_msg', 'Erro ao salvar o usuário!')
                            res.redirect('usuario/login')
                        }
                        novoUsuario.senha = hash
                        Usuario.create(novoUsuario).then((()=>{
                            req.flash('sucess_msg','Usuario cadastrado com sucesso!')
                            res.redirect('/usuario/login')
                        })).catch ((error)=>{
                            req.flash('error_msg', error.message)
                        })
                    })
                })
            })
        }
    }
}

export default new PessoaController()