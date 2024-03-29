import User from "../../models/mongoose/user.js";


class CartController{

    static index(req, res){
        if(req.session.user){
            User.findOne({_id: req.session.user._id})
            .then(user=>{
                if(user){
                    user
                    .populate('cart.items.productId')
                    .then(user=>{
                        res.render('shops/carts/index.ejs', {
                        cartItems: user.cart.items ,
                        pageTitle: 'Cart',
                        path: '/shops/carts' 
                        })
                    })  
                    .catch( err=>console.log(err) ); 
                }                
            })
            .catch( err=>console.log(err) ); 
        }
         

    }

    static store(req, res){
        const productId = req.body.productId;
        User.findOne({_id: req.session.user._id})
        .then(user=>{
            if(!user.cart._id){  // new cart
                user.cart = { items:[] } ;//new mongoose.mongo.ObjectId();           
            } 
            const itemIndex = user.cart.items.findIndex(item=>{           
                return item.productId.toString() === productId.toString();
            })
            if( itemIndex >= 0 ){ // pick old product in cart
                user.cart.items[itemIndex].quantity += 1;
            }
            else{ // pick new product
                user.cart.items.push({productId:productId,quantity:1});  
            }
            return user.save()
        })            
        .then(result =>{
            res.redirect('/shops/carts');             
        })
        .catch( err=>console.log(err) ); 
    } 

    static destroy(req, res){  
        const itemId = req.body.itemId;
        User.findOne({_id: req.session.user._id})
        .then(user=>{
            User.findOneAndUpdate({'cart._id':user.cart._id},{ $pull: { 'cart.items': { _id : itemId }  } })
            .then(result => res.redirect("/shops/carts") )
            .catch( err=>console.log(err) ); 
        })
        .catch( err=>console.log(err) ); 
    } 
}

export default CartController;

