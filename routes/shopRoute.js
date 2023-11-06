import ProductController from "../controllers/shops/productController.js";
import CartController from "../controllers/shops/cartController.js";
import OrderController from "../controllers/shops/orderController.js";
import InvoiceController from "../controllers/shops/invoiceController.js";
import ShopController from "../controllers/shops/shopController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";


class ShopRoute{
    static init(app){

        app.get("/",ShopController.index);

        app.get("/shops/products",ProductController.index);
        app.get("/shops/products/:id",ProductController.show);

        app.get("/shops/carts",AuthMiddleware.auth, CartController.index); 
        app.post("/shops/carts",AuthMiddleware.auth, CartController.store); 
        app.delete("/shops/carts",AuthMiddleware.auth, CartController.destroy); 

        app.get("/shops/orders",AuthMiddleware.auth, OrderController.index); 
        app.post("/shops/orders",AuthMiddleware.auth, OrderController.store);  
        
        app.get("/shops/invoices/:id",AuthMiddleware.auth, InvoiceController.show);       
    }
}


export default ShopRoute ;