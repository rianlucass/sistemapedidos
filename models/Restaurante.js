import banco from "../config/banco.js";

const Restaurante = banco.sequelize.define('restaurantes',{
    id:{
        type: banco.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: banco.Sequelize.STRING(100),
        allowNull: false
    },
    email:{
        type: banco.Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    senha:{
        type: banco.Sequelize.STRING(250),
        allowNull: false
    },
    cnpj:{
        type: banco.Sequelize.STRING(30),
        allowNull: false,
        unique: true
    },
    descricao: {
        type: banco.Sequelize.TEXT,
        allowNull: false
    },
    logo: {
        type: banco.Sequelize.STRING,
    },
    login:{
        type: banco.Sequelize.STRING(100)
    },
    status:{
        type: banco.Sequelize.INTEGER,
    },
    categoria:{
        type: banco.Sequelize.INTEGER
    },
})

Restaurante.sync();

export default Restaurante