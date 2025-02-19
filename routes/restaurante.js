import express from 'express'
const router = express.Router()
import RestauranteController from '../controller/RestauranteController.js'
import restauranteAutenticacao from '../middlewares/restauranteAutenticacao.js'
import CardapioController from '../controller/CardapioController.js'
import upload from '../middlewares/upload.js'
import PedidoController from '../controller/PedidoController.js'

router.get('/restaurante/login', (req, res)=>{
    res.render('restaurante/login')
})

router.get('/restaurante/cadastrar',(req, res)=>{ 
    res.render('restaurante/cadastro') 
})

router.post('/restaurante/cadastrar', RestauranteController.cadastrar)

router.post('/restaurante/login', RestauranteController.login)

router.get('/logout', RestauranteController.logout)

router.get('/restaurante/dashboard', restauranteAutenticacao, PedidoController.listarPedidosPorRestaurante);

router.get('/restaurante/cardapio', (req, res) => {
    if (!req.user) {
        return res.redirect('restaurante/login')
    }
    CardapioController.index(req, res)
})

router.post('/restaurante/cardapio/salvar',upload.single('imagem'), CardapioController.salvar)

router.get('/restaurante/perfil', RestauranteController.perfil)

router.post('/restaurante/perfil/atualizar', upload.single('logo'), RestauranteController.atualizarPerfil)

router.post('/restaurante/cardapio/editar/:id', CardapioController.editar)

router.post('/restaurante/cardapio/excluir/:id', CardapioController.excluir)

export default router