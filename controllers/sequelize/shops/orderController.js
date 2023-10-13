import Product from "../../models/sequelize/product.js";
import Cart from "../../models/sequelize/cart.js";
import CartItem from "../../models/sequelize/cartItem.js";
import Order from "../../models/sequelize/order.js";
import OrderDetail from "../../models/sequelize/orderDetail.js";
import User from "../../models/sequelize/user.js";

class OrderController{

    static index(req, res){  
        const user = req.user;
        user.getOrders({include:['products']})
        .then(orders=>{  
            res.render('shops/orders/index.ejs', {
            orders: orders ,
            pageTitle: 'Order',
            path: '/shops/orders'
            })
        })
        .catch( err=>console.log(err) );  

    }

    static store(req, res){ 
        const user = req.user;
        let foundCart = null;
        user.getCart({where:{userId:user.id}})
        .then( cart=>{ 
            foundCart = cart;
            return cart.getProducts();
        })
        .then( products=>{ 
            user.createOrder()
            .then( order=>{  
                return order.addProducts(
                    products.map(product=>{
                        product.orderDetail = {quantity: product.cartItem.quantity} ;
                        return product;
                    })
                ); 
            })
            .catch( err=>console.log(err) ); 
        })
        .then( result=>{ 
            return foundCart.setProducts(null);
        })
        .then( result=>{ 
            res.redirect('/shops/orders');
        })
        .catch( err=>console.log(err) );   
    }

}

export default OrderController;