import passport from "passport";

class UsuarioController {
    login = (req, res, next)=>{
        passport.authenticate('local', {
            successRedirect: 'home',
            failureRedirect: '/usuario/login',
            failureFlash: true
        })(req, res, next)
    }

    logout = (req, res, next)=>{
        req.logout((erro)=>{
            res.redirect('/usuario/login')
        })
    }
}

export default new UsuarioController()