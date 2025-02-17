import banco from "../config/banco.js";
import Restaurante from '../models/Restaurante.js'

const Cardapio = banco.sequelize.define('cardapios', {
    id:{
        type: banco.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: banco.Sequelize.STRING(100),
        allowNull: false
    },
    preco:{
        type: banco.Sequelize.FLOAT,
        allowNull: false
    },
    descricao:{
        type: banco.Sequelize.STRING(1000),
        allowNull: false
    },
    imagem:{
        type: banco.Sequelize.STRING(255),
        allowNull: false
    }
})

Cardapio.belongsTo(Restaurante,{
    foreingKey: 'restaurante_id',
    constraint: true,
    as: 'restaurante'
})

Cardapio.sync()

export default Cardapio