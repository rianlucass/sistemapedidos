import passport from "passport";
import Restaurante from '../models/Restaurante.js'
import Cardapio from '../models/Cardapio.js'

class UsuarioController {
    login = (req, res, next)=>{
        passport.authenticate('usuario-local', (err, usuario, info) => {
            if (err){ 
                return next(err)
            }
            if (!usuario){ 
                req.flash("error_msg", info.message || "Credenciais inválidas.")
                return res.redirect('/usuario/login')
            }
    
            req.logIn(usuario, (err) => {
                if (err){
                    return next(err)
                }
                res.redirect('/usuario/home')
            })
        })(req, res, next)
    }

    mostrarCardapio = async (req, res) => {
        const { id } = req.params
        
        try {
            const restaurante = await Restaurante.findByPk(id)
            
            if (!restaurante) {
                req.flash("error_msg", "Restaurante não encontrado.")
                return res.redirect('/usuario/home')
            }

            const cardapio = await Cardapio.findAll({
                where: { restaurante_id: id } 
            })

            res.render('usuario/cardapio', { restaurante, cardapio })
        } catch (error) {
            console.error(error)
            req.flash("error_msg", "Erro ao carregar o cardápio.")
            res.redirect('/usuario/home')
        }
    }

    logout = (req, res, next)=>{
        req.logout((erro)=>{
            res.redirect('/')
        })
    }

    listarRestaurantes = async (req, res) => {
        const restaurantes = await Restaurante.findAll()
        res.render('usuario/home',{restaurantes: restaurantes})
    }

}

export default new UsuarioController()