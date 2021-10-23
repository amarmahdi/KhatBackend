import {Sequelize} from "sequelize";
import Config from "./config"

const Seq = new Sequelize(
    Config.db.database,
    Config.db.user,
    Config.db.password,
    {
        dialect: 'postgres'
    },
)

export default Seq