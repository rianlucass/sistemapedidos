import express from 'express'
const router = express.Router()
import RestauranteController from '../controller/RestauranteController.js'
import restauranteAutenticacao from '../middlewares/restauranteAutenticacao.js'

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

export default router