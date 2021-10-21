const express = require('express')
const app = express()
const services = require('./services/db')
const cors = require('cors')
const { Login, Signup, Token } = require('./routes/Auth')
const config = require('./services/config')

app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.use('/login', Login)
app.use('/signup', Signup)
app.use('/tokengen', Token)

const init = async ()=>{
    await services.sequelize.sync({alter: true})
    app.listen(config.port, ()=>{
            console.log("Server listening on port "+ config.port)
    })
}
init()