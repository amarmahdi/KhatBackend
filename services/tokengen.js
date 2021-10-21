const JWT = require('jsonwebtoken')
const confg = require('./config')

module.exports = (user)=>{
    const EXP_DATE = 60 * 60 * 24 * 7
    return JWT.sign({user}, config.authentication.JWTSecret, {expiresIn: EXP_DATE})
}
