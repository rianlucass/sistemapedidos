export default function verificaUsuario(req, res, next) {
    if (req.isAuthenticated() && req.user) {
        return next()
    }
    res.redirect('/usuario/home')
}