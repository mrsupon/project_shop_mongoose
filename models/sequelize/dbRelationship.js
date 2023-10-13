import User from "./user.js"
import Product from "./product.js"
import Cart from "./cart.js"
import CartItem from "./cartItem.js"
import Order from "./order.js"
import OrderDetail from "./orderDetail.js"

class DbRelationship{
    static set(){
        Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
        User.hasMany(Product);   
        
        Cart.belongsTo(User);
        User.hasOne(Cart);
        
        Cart.belongsToMany(Product,{through:CartItem});
        Product.belongsToMany(Cart,{through:CartItem});
        
        User.hasMany(Order);
        Order.belongsTo(User);
        Order.belongsToMany(Product,{through:OrderDetail});
        Product.belongsToMany(Order,{through:OrderDetail}); 
    }
}

export default DbRelationship ; 

 
