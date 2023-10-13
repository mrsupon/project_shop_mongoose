import mongoose from "mongoose";

class DbMongoose{
    static sync(  ){ //alter, force
        const db = "shop";
        //await mongoose.connect('mongodb://admin:Ss12345678@cluster0.twlafbw.mongodb.net/'+db);
        return mongoose.connect('mongodb://127.0.0.1:27017/'+db);  
    }
}

  ////mongoDB using method 2
  // const db = "shop";
  // async function main() {
  //   await mongoose.connect('mongodb://admin:Ss12345678@cluster0.twlafbw.mongodb.net/'+db);
  //   //await mongoose.connect('mongodb://127.0.0.1:27017/'+db);
  // }
  // main().catch(err => console.log(err));

export default DbMongoose ;
 
