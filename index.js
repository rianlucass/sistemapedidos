import express from 'express'
const app = express()
import handlebars from 'express-handlebars'
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import session from 'express-session'
import passport from 'passport'
import flash from 'connect-flash'
import authUser from './config/authUser.js'
import authRes from './config/authRes.js'
authUser(passport)
authRes(passport)
authConfig(passport)

app.use(session({
    secret: 'trabalhowebsistemapedidos',
    resave: true,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function (req, res, next){
   res.locals.success_msg = req.flash("success_msg");
   res.locals.error_msg = req.flash("error_msg")
   res.locals.error = req.flash('error')
   res.locals.usuario = req.user || null
   res.locals.user = req.isAuthenticated() ? req.user : null
   next()
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/',(req, res) => {
    res.render('home/homeInicial')
})

import usuario from './routes/usuario.js'
app.use('/', usuario)

import restaurante from './routes/restaurante.js'
import authConfig from './config/authConfig.js'
app.use('/', restaurante)

app.use('/uploads', express.static(path.join('uploads')))

app.listen(3020,()=>{
    console.log('Servidor rodando em http://localhost:3020')
})