import passport from "passport";
import Restaurante from '../models/Restaurante.js'

class UsuarioController {
    login = (req, res, next)=>{
        passport.authenticate('usuario-local', (err, usuario, info) => {
            if (err){ 
                return next(err)
            }
            if (!usuario){ 
                req.flash("error_msg", info.message || "Credenciais inválidas.")
                return res.redirect('/usuario/login')
            }
    
            req.logIn(usuario, (err) => {
                if (err){
                    return next(err)
                }
                res.redirect('/usuario/home')
            })
        })(req, res, next)
    }

    logout = (req, res, next)=>{
        req.logout((erro)=>{
            res.redirect('/')
        })
    }

    listarRestaurantes = async (req, res) => {
        const restaurantes = await Restaurante.findAll()
        res.render('usuario/home',{restaurantes: restaurantes})
    }

}

export default new UsuarioController()