import express from 'express'
const router = express.Router()
import RestauranteController from '../controller/RestauranteController.js'
import restauranteAutenticacao from '../middlewares/restauranteAutenticacao.js'
import CardapioController from '../controller/CardapioController.js'
import upload from '../middlewares/upload.js'

router.get('/restaurante/login', (req, res)=>{
    res.render('restaurante/login')
})

router.get('/restaurante/cadastrar',(req, res)=>{ 
    res.render('restaurante/cadastro') 
})

router.post('/restaurante/cadastrar', RestauranteController.cadastrar)
router.post('/restaurante/login', RestauranteController.login)
router.get('/logout', RestauranteController.logout)

router.get('/restaurante/dashboard', restauranteAutenticacao, (req, res) => {
    res.render('restaurante/dashboard', {restaurante: req.user})
})

router.get('/restaurante/cardapio', (req, res) => {
    if (!req.user) {
        req.flash('error_msg', 'Você precisa estar logado para acessar esta página')
        return res.redirect('restaurante/login')
    }
    CardapioController.index(req, res)
})
router.post('/restaurante/cardapio/salvar',upload.single('imagem'), CardapioController.salvar)

router.get('/restaurante/perfil', (req, res) => {
    if (!req.user) {
        req.flash('error_msg', 'Você precisa estar logado para acessar esta página')
        return res.redirect('restaurante/login')
    }
    res.render('restaurante/perfil')
})


export default router