import { Pedido, PedidoItens } from "../config/associacao.js";

class PedidoController {
    realizarPedido = async (req, res) => {
        try {
            const { restaurante_id, usuario_id,nome_cliente, endereco_cliente, total, itens } = req.body;

            if (!restaurante_id || !usuario_id || !itens.length) {
                return res.status(400).json({ message: "Dados inválidos." })
            }

            const novoPedido = await Pedido.create({
                nome_cliente,
                endereco_cliente,
                restaurante_id,
                usuario_id,
                total
            })

            const itensPedido = itens.map(item => ({
                pedido_id: novoPedido.id,
                nome_prato: item.nome,
                preco: item.preco,
                quantidade: item.quantidade
            }))

            await PedidoItens.bulkCreate(itensPedido);

            return res.status(201).json({ message: "Pedido realizado com sucesso!" })

        } catch (error) {
            console.error("Erro ao realizar pedido:", error);
            return res.status(500).json({ message: "Erro ao realizar pedido." })
        }
    }


    buscarPedidosPorRestaurante = async (req, res) => {
        try {
            const { restaurante_id } = req.params;

            if (!restaurante_id) {
                req.flash("error_msg", "ID do restaurante obrigatório.")
                return res.redirect("/usuario/cardapio")
            }

            const pedidos = await Pedido.findAll({
                where: { restaurante_id },
                include: { model: PedidoItens, as: "itens" }
            })

            return res.status(200).json(pedidos)
        } catch (error) {
            req.flash("error_msg", "Erro ao buscar pedidos.")
            return res.redirect("/usuario/cardapio")
        }
    }
    
    listarPedidosPorUsuario = async (req, res) => {
        try {
            const { usuario_id } = req.params;
    
            if (!usuario_id) {
                return res.status(400).json({ message: "ID do usuário obrigatório." });
            }
    
            const pedidos = await Pedido.findAll({
                where: { usuario_id },
                include: [{ model: PedidoItens, as: "itens" }]
            });
    
            return res.status(200).json(pedidos);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            return res.status(500).json({ message: "Erro ao buscar pedidos." });
        }
    }

}

export default new PedidoController();
