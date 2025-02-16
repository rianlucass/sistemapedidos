import passportLocal from 'passport-local'
const localEstrategy = passportLocal.Strategy
import Usuario from '../models/Usuario.js'
import Restaurante from '../models/Restaurante.js'
import bcrypt from 'bcrypt'

export default (passport)=>{
    passport.use(new localEstrategy(
        {usernameField: 'email', passwordField: 'password'},
        async (email, password, done)=>{
            Usuario.findOne({
                where:{
                    login: email
                }
            }).then((usuario)=>{
                if(!usuario){
                    return done(null, false, {message: 'Usuario não encontrado'})
                }
                bcrypt.compare(password, usuario.senha, (erro, iguais)=>{
                    if(iguais){
                        return done(null, usuario)
                    } else {
                        return done(null, false, {message: 'Senha incorreta!'})
                    }
                })
            })
        }
    ))

    passport.use(new localEstrategy(
        {usernameField: 'email', passwordField: 'password'},
        async (email, password, done)=>{
            Restaurante.findOne({
                where:{
                    login: email
                }
            }).then((restaurante)=>{
                if(!restaurante){
                    return done(null, false, {message: 'Restaurante não encontrado'})
                }
                bcrypt.compare(password, restaurante.senha,(erro, iguais)=>{
                    if(iguais){
                        return done(null, restaurante)
                    } else {
                        return done(null, false, {message: 'Senha Incorreta!'})
                    }
                })
            })
        }
    ))

    passport.serializeUser((usuario, done)=>{
        done(null, usuario.id)
    })
    passport.deserializeUser((id, done)=>{
        Usuario.findByPk(id).then((usuario)=>{
            done(null, usuario)
        })
    })


    passport.serializeUser((restaurante, done)=>{
        done(null, restaurante.id)
    })
    passport.deserializeUser((id, done)=>{
        Restaurante.findByPk(id).then((restaurante)=>{
            done(null, restaurante)
        })
    })
}