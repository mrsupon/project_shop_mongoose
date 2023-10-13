import 'dotenv/config'
import sequelize from "sequelize";

var db = new sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: "mysql",
        host: process.env.DB_HOST, 
        logging: false
    }
);

export default db ; 