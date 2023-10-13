import sequelize from "sequelize"
import db from "../../database/database_sequelize.js"

const  User = db.define('user',{
        id:{
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:sequelize.STRING, 
        email:sequelize.STRING
    },
    {  //updatedAt:false

});

export default User;