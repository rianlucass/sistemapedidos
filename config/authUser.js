import passportLocal from 'passport-local'
const localEstrategy = passportLocal.Strategy
import Usuario from '../models/Usuario.js'
import bcrypt from 'bcrypt'

export default (passport)=>{
    passport.use('usuario-local',new localEstrategy(
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
}