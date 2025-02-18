import banco from "../config/banco.js";

const PedidoItens = banco.sequelize.define('pedidos_itens', {
    id: {
        type: banco.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pedido_id: {
        type: banco.Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'pedidos', key: 'id' }
    },
    nome_prato: {
        type: banco.Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: banco.Sequelize.FLOAT,
        allowNull: false
    },
    quantidade: {
        type: banco.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})

PedidoItens.sync()

export default PedidoItens