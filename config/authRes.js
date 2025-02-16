import passportLocal from 'passport-local'
const localEstrategy = passportLocal.Strategy
import Restaurante from '../models/Restaurante.js'
import bcrypt from 'bcrypt'

export default (passport)=>{
    passport.use('restaurante-local',new localEstrategy(
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

    passport.serializeUser((restaurante, done)=>{
        done(null, restaurante.id)
    })
    passport.deserializeUser((id, done)=>{
        Restaurante.findByPk(id).then((restaurante)=>{
            if(!restaurante){
                return done(null, false)
            }
            done(null, restaurante)
        }).catch((err) => done(err, null))
    })
}