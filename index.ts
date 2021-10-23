import express from 'express'
import Cors from 'cors'
import Config from './Services/config'
import Auth from './Routes/Auth'

const app = express()

app.use(Cors({
    origin: '*'
}))

app.use('/', Auth)

app.listen(Config.port, ()=>{
    console.log('Server listening on port', Config.port)
})
