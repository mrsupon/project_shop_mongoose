import mongoose from "mongoose";

class DbMongoose{
    static dbName = "shop"
    static connectionString = 'mongodb+srv://admin:Ss12345678@cluster0.twlafbw.mongodb.net/'+ DbMongoose.dbName;

    static async sync(  ){ //alter, force
        const db = "shop";
        ////mongoDB using method 1
        //return mongoose.connect('mongodb://127.0.0.1:27017/'+db);  
        //mongoDB using method 2
          await mongoose.connect(DbMongoose.connectionString);
          //await mongoose.connect('mongodb://127.0.0.1:27017/'+db);
    }

} 



export default DbMongoose ;
 
