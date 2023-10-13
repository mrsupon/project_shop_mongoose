import sequelize from "sequelize";
import db from "../../database/database_sequelize.js"

const  Product = db.define('product',{
        id:{
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title:sequelize.STRING, 
        price:sequelize.FLOAT,
        imageUrl:sequelize.STRING,
        description:sequelize.STRING
    }, 
    {  //updatedAt:false 

});

export default Product; 