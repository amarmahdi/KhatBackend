import Seq from "./Dbcon";
import sequelize from "sequelize";

export const User = Seq.define('Users', {
    id: {
        type: sequelize.DataTypes.UUID,
        defaultValue: sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },
    email: {
        type: sequelize.DataTypes.STRING,
    },
    username: {
        type: sequelize.DataTypes.STRING
    },
    password: {
        type: sequelize.DataTypes.STRING
    }
})

export const Tokens = Seq.define('Tokens', {
    userId: {
        type: sequelize.DataTypes.STRING,
    },
    token: {
        type: sequelize.DataTypes.STRING,
    }
})