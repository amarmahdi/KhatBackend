const models = require('./../services/models')
const JWT = require('./../services/tokengen')
const Selectors = require('./../services/selectors')

// Login a user and create a login token
const Login = async (req, res)=>{
    try {
        const { username } = req.body
        const findUser = await Selectors.user(username)
        const token = JWT(username)
        findUser.dataValues.token = token
        res.json({
            data: findUser,
        })
    } catch (error) {
        res.json({
            error
        })
    }
}

// Sign up a user and create a login token
const Signup = async (req, res)=>{
    try {
        const { username } = req.body
        const createUser = await models.User.create(req.body)
        const token = JWT(username)
        createUser.dataValues.token = token
        res.json({
            data: createUser,
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
