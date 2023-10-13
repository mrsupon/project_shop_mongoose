import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Order = mongoose.model("Order",new Schema({

    orderDetails:[{
            productId: {type: mongoose.Types.ObjectId, ref:'Product', required:true},
            quantity:  {type: Number, required:true}, 
        }
    ],
    userId:{type: mongoose.Types.ObjectId, required:true},

}));

export default Order ;