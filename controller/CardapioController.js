import Cardapio from "../models/Cardapio.js"
import Restaurante from "../models/Restaurante.js"

class CardapioController {
    index = async (req, res) => {
        const prato = Cardapio.findAll()
        res.render('restaurante/cardapio', {prato: prato})
    }

    salvar = (req,res) => {
        let prato = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            imagem: req.file ? `/uploads/restaurante/${req.file.filename}` : null,
            restaurante_id: req.body.id 
        }

        Cardapio.create(prato).then(() => {
            req.flash('success_msg', 'Prato adicionado com sucesso!')
            res.redirect('/restaurante/cardapio')
        }).catch((error) =>{
            console.error('Erro ao adicionar prato:', error);
            req.flash('error_msg', 'Erro ao adicionar prato.')
            res.redirect('/restaurante/cardapio')
        })
    }
}

export default new CardapioController()