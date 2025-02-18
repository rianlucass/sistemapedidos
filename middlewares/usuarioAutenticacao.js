export default function verificaUsuario(req, res, next) {
    if (req.isAuthenticated() && req.user && req.user.categoria === 0) {
        return next()
    }
    res.redirect('/usuario/login')
}