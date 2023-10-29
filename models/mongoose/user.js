import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    cart:{
        _id:{
            type: mongoose.Types.ObjectId, 
            auto: true
        },
        items:[{
            productId:{type:Schema.Types.ObjectId, ref:'Product', required:true},
            quantity:{type:Number, required:true}
        }]
    },  
});
  
const User = mongoose.model("User",userSchema);
export default User ;