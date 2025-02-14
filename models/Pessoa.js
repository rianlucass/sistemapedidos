import banco from "../config/banco.js";

const Pessoa = banco.sequelize.define('pessoas', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: banco.Sequelize.STRING(100),
        allowNull: false,
    },
    email:{
        type: banco.Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    cpf:{
        type: banco.Sequelize.STRING(20),
        allowNull: false,
        unique: true
    },
    status:{
        type: banco.Sequelize.INTEGER
    }
})

Pessoa.sync()

export default Pessoa