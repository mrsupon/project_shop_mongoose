import User from "../../models/mongoose/user.js"
import Order from "../../models/mongoose/order.js"

class OrderController{

    static index(req, res){ 
        if(req.session.user) {
            Order.find({userId: req.session.user._id})
            .populate('orderDetails.productId', 'title price description imageUrl')
            .then(orders=>{            
                res.render('shops/orders/index.ejs', {
                orders: orders ,
                pageTitle: 'Order',
                path: '/shops/orders'
                })
            })
            .catch( err=>console.log(err) );              
        } 
    }

    static store(req, res){ 
        User.findOne({_id: req.session.user._id})
        .then(user=>{
            if(user){
                // const cartItems = req.user.cart.items;  // orderDetail._id like as cart.item._id
                const cartItems = user.cart.items.map(item=>{ // create new orderDetail _id
                    return {productId:item.productId, quantity:item.quantity}
                });
                const newOrder = new Order({
                    orderDetails:cartItems,
                    userId:user._id
                });
                newOrder.save()
                .then(result=>{
                    user.cart = {};
                    return user.save();
                }) 
                .then( result =>{
                    res.redirect('/shops/orders');
                })                
                .catch( err=>console.log(err) );
            }                
        })
        .catch( err=>console.log(err) );  
    }

}

export default OrderController;