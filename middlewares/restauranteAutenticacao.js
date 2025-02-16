export default function restauranteAutenticacao(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/restaurante/login')
}