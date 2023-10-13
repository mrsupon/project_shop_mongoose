import Product from "../../models/sequelize/product.js";
import Cart from "../../models/sequelize/cart.js";

class CartController{

    static index(req, res){
        const user = req.user;
        user.getCart({where:{userId:user.id}})
        .then( cart=> { 
            cart.getProducts()
            .then(products=>{ 
                res.render('shops/carts/index.ejs', {    
                products: products ,
                pageTitle: 'Cart',
                path: '/shops/carts'
                })
            })
            .catch( err=>console.log(err) );
        })
        .catch( err=>console.log(err) );  

        // const joinedCart = Cart.joinWithProduct();
        // res.render('shops/carts/index.ejs', { 
        // cart: joinedCart ,
        // pageTitle: 'Cart',
        // path: '/shops/carts'
        // })
    }

    static store(req, res){
        const productId = req.body.productId;
        const user = req.user;
        user.getCart({where:{userId:user.id}})
        .then( cart=>{
            if(!cart)   // new cart
                return user.createCart();   
            else        // found cart  
                return cart;          
        })
        .then( cart=>{
            cart.getProducts({where:{id:productId}})
            .then(products=>{   // pick old product in cart
                if(products.length > 0){
                    const product = products[0];
                    product.cartItem.quantity += 1; 
                    product.cartItem.save();  
                    return cart;                      
                }
                else{           // pick new product
                    Product.findByPk(productId)    
                    .then( product=> cart.addProduct(product, {through:{quantity: 1}}) )
                    .catch( err=>console.log(err) );
                    return cart;
                }
            })
        })
        .then( cart=> res.redirect('/shops/carts') )
        .catch( err=>console.log(err) );  
    } 

    static destroy(req, res){ 
        const productId = req.params.id;
        const user = req.user;
        user.getCart({where:{userId:user.id}})
        .then( cart=>       { return cart.getProducts({where:{id:productId}})  })
        .then( products=>   { return products[0].cartItem.destroy()  })
        .then( result=>     { res.redirect("/shops/carts"); })
        .catch( err=>console.log(err) ); 
    } 
}

export default CartController;