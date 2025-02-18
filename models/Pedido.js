import banco from "../config/banco.js";

const Pedido = banco.sequelize.define('pedidos', {
    id: {
        type: banco.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    restaurante_id: {
        type: banco.Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'restaurantes', key: 'id' }
    },
    usuario_id: {
        type: banco.Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
    },
    status: {
        type: banco.Sequelize.STRING,
        defaultValue: "Pendente"
    },
    total: {
        type: banco.Sequelize.FLOAT,
        allowNull: false
    }
})

Pedido.sync()

export default Pedido