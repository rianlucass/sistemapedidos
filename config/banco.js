import Sequelize from 'sequelize'

const NAME_DB = 'teste'
const USER = 'root'
const PASSWORD = 'root'
const HOST = 'localhost'

const sequelize = new Sequelize(
    NAME_DB,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: 'mysql',
        timezone: '-03:00',
    }
)

sequelize.authenticate().then(()=>{
    console.log('Conexão realizada com sucesso!')
}).catch((erro)=>{
    console.error('Erro: ' + erro)
})

export default {Sequelize, sequelize}