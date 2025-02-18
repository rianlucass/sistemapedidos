import Cardapio from "../models/Cardapio.js"

class CardapioController {
    index = async (req, res) => {
        if (!req.user) {
            req.flash('error_msg', 'Você precisa estar logado para acessar esta página');
            return res.redirect('/login');
        }
    
        try {
            const pratos = await Cardapio.findAll({
                where: { restaurante_id: req.user.id }
            })
            console.log(pratos)
            res.render('restaurante/cardapio', { 
                pratos: pratos,
                restaurante: req.user
            })

            console.log(req.user.id)
        } catch (error) {
            console.error('Erro ao listar pratos:', error)
            req.flash('error_msg', 'Erro ao listar pratos.')
            res.redirect('/restaurante/cardapio')
        }
    }

    salvar = async (req,res) => {
        let prato = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            imagem: req.file ? `/uploads/restaurante/${req.file.filename}` : null,
            restaurante_id: req.user.id
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

    editar = async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, descricao, preco } = req.body;
            await Cardapio.update(
                { nome, descricao, preco },
                { where: { id } }
            )
            req.flash('success_msg', 'Prato atualizado com sucesso!')
            res.redirect('/restaurante/cardapio')
        } catch (error) {
            req.flash('error_msg', 'Erro ao atualizar prato.')
            res.redirect('/restaurante/cardapio')
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;
            
            await Cardapio.destroy({ where: { id } });

            req.flash('success_msg', 'Prato excluído com sucesso!');
            res.redirect('/restaurante/cardapio');
        } catch (error) {
            console.error(error);
            req.flash('error_msg', 'Erro ao excluir prato.');
            res.redirect('/restaurante/cardapio');
        }
    }
}

export default new CardapioController()