export default function verificaRestaurante(req, res, next) {
    if (req.isAuthenticated() && req.user) {
        return next()
    }
    res.redirect('/restaurante/dashboard')
}