const db = require('./db')

const models = {}

models.User = db.sequelize.define('Users', {
        id: {
            type: db.Sequelize.DataTypes.UUID,
            defaultValue: db.Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        email: {
            type: db.Sequelize.DataTypes.STRING,
        },
        username: {
            type: db.Sequelize.DataTypes.STRING
        },
        password: {
            type: db.Sequelize.DataTypes.STRING
        }
    }
)

models.Tokens = db.sequelize.define('Tokens', {
    userId: {
        type: db.Sequelize.DataTypes.STRING,
    },
    token: {
        type: db.Sequelize.DataTypes.STRING,
    }
})


module.exports = models