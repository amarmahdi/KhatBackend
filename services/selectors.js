const models = require('./models')


const selectors = {}

selectors.user = async (username) =>{
    const selectUser = await models.User.findOne({
        where: {
            username
        }
    })
    return selectUser
}


module.exports = selectors