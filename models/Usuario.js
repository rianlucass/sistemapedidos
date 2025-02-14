import banco from "../config/banco.js";
import Pessoa from "./Pessoa.js";

const Usuario = banco.sequelize.define('usuario', {
    id:{
        type: banco.Sequelize.INTEGER
    },
    login:{
        type: banco.Sequelize.STRING(100)
    },
    senha:{
        type: banco.Sequelize.STRING(250)
    },
    categoria:{
        type: banco.Sequelize.INTEGER
    },
    status:{
        type: banco.Sequelize.INTEGER
    }
})

Usuario.belongsTo(Pessoa,{
    ForeignKey: 'pessoa_id',
    constraint: true,
    as: 'pessoa'
})

Usuario.sync()

export default Usuario