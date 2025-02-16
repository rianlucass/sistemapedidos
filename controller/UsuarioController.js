import passport from "passport";

class UsuarioController {
    login = (req, res, next)=>{
        passport.authenticate('usuario-local', (err, usuario) => {
            if (err){ 
                return next(err)
            }
            if (!usuario){ 
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
}

export default new UsuarioController()