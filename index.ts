import express from 'express'
import Cors from 'cors'
import Config from './Services/config'
import Auth from './Routes/Auth'
import Dbcon from './Services/Dbcon'

const app = express()

app.use(express.json())
app.use(Cors({
    origin: '*'
}))

app.use('/', Auth)

const init = async ()=>{
    await Dbcon.sync({alter: true})
    app.listen(Config.port, ()=>{
        console.log('Server listening on port', Config.port)
    })
}

init()
