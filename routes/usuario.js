import express from "express"
const router = express.Router()
import PessoaController from "../controller/PessoaController.js"
import UsuarioController from "../controller/UsuarioController.js"
import usuarioAutenticacao from "../middlewares/usuarioAutenticacao.js"

router.get('/usuario/login', (req, res)=>{
    res.render('usuario/login')
})
router.get('/usuario/cadastrar',(req, res)=>{ 
    res.render('usuario/cadastro') 
})
router.post('/usuario/cadastrar', PessoaController.cadastrar)

router.post('/usuario/login', UsuarioController.login)
router.get('/logout', UsuarioController.logout)

router.get('/usuario/home', usuarioAutenticacao,(req, res) => {
    UsuarioController.listarRestaurantes(req, res)
})

export default router