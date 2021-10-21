const models = require('./services/models')
const JWT = require('./../services/tokengen')

const Login = async (req, res)=>{
    res.send("Hello there!")
}

// Sign up a user and create a login token
const Signup = async (req, res)=>{
    try {
        const createUser = await models.User.create(req.body)
        const token = JWT(createUser)
        res.json({
            data: createUser,
            token
        })
        
    } catch (error) {
        res.json({
            error
        })
    }
}

//register user token to the data base
const Token = async (req, res)=>{
    try {
        const createToken = await models.Tokens.create(req.body)
        res.json({
            data: createToken
        })
    } catch (error) {
        res.json({
            error
        })
    }
}

module.exports = { Login, Signup, Token }
