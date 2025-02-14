import express from "express"
const router = express.Router()
import PessoaController from "../controller/PessoaController.js"
import UsuarioController from "../controller/UsuarioController.js"

router.get('/usuario/login', (req, res)=>{
    res.render('usuario/login')
})
router.get('/usuario/cadastrar',(req, res)=>{ 
    res.render('usuario/cadastro') 
})
router.post('/usuario/cadastrar', PessoaController.cadastrar)

router.post('/usuario/login', UsuarioController.login)
router.get('/usuario/logout', UsuarioController.logout)

//home do usuario
router.get('/usuario/home', (req, res)=>{
    res.render('home/homeUsuario')
})

export default router