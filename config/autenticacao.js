/*
import passportLocal from 'passport-local'
const localEstrategy = passportLocal.Strategy
import Usuario from '../models/Usuario.js'
import bcrypt from 'bcryptjs.js'

export default function(passport) {
    passport.use(new localEstrategy(
        {usernameField: 'username', passwordField: 'passwordField'},
        (username, password, done)=>{
            Usuario.findOne({
                where:{
                    login: username
                }
            }).then((usuario)=>{
                if(!usuario){
                    return done(null, false,{message: 'Usuário não encontrado!'})
                }

                bcrypt.compare(password, usuario.senha,(erro, iguais)=>{
                    if(iguais){
                        return done(null, usuario)
                    }else{
                        return done(null, false, {message: 'Senha Incorreta!'})
                    }
                })
            })
        }
    ))

    passport.serializerUser((usuario, done)=>{
        done(null, usuario.id)
    })

    passport.deserializerUser((id, done)=>{
        Usuario.findByPk(id).then((usuario)=>{
            done(null, usuario)
        })
    })
}

*/