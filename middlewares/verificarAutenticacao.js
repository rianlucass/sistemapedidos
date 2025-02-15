export default function usuarioAutenticacao(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/usuario/login')
}