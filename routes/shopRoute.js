import ShopsProductController from "../controllers/shops/productController.js";
import ShopsCartController from "../controllers/shops/cartController.js";
import ShopsOrderController from "../controllers/shops/orderController.js";
import ShopController from "../controllers/shops/shopController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";


class ShopRoute{
    static init(app){

        app.get("/",ShopController.index);

        app.get("/shops/products",ShopsProductController.index);
        app.get("/shops/products/:id",ShopsProductController.show);

        app.get("/shops/carts",AuthMiddleware.auth, ShopsCartController.index); 
        app.post("/shops/carts",AuthMiddleware.auth, ShopsCartController.store); 
        app.delete("/shops/carts",AuthMiddleware.auth, ShopsCartController.destroy); 

        app.get("/shops/orders",AuthMiddleware.auth, ShopsOrderController.index); 
        app.post("/shops/orders",AuthMiddleware.auth, ShopsOrderController.store);   
    }
}


export default ShopRoute ;