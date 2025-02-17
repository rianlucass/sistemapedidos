export default function verificaRestaurante(req, res, next) {
    if (req.isAuthenticated() && req.user && req.user.categoria === 1 ) {
        return next()
    }
    res.redirect('/restaurante/login')
}