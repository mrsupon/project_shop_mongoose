import mongoose from "mongoose";

class DbMongoose{
    static dbName = "shop"
    //static connectionString = 'mongodb+srv://admin:Ss12345678@cluster0.twlafbw.mongodb.net/'+ DbMongoose.dbName;
    static connectionString = 'mongodb://127.0.0.1:27017/'+ DbMongoose.dbName;
    static async connect(  ){ //alter, force
        await mongoose.connect(DbMongoose.connectionString);    
    }

} 

export default DbMongoose ; 
 
