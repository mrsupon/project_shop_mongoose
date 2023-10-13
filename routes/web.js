
import AdminsProductController from "../controllers/admins/productController.js";
import ShopsProductController from "../controllers/shops/productController.js";
import ShopsCartController from "../controllers/shops/cartController.js";
import ShopsOrderController from "../controllers/shops/orderController.js";
import ShopController from "../controllers/shops/shopController.js";
import AuthRoute from "./auth.js";
import ErrorController from "../controllers/errorController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";


class Route{
        static init(app){            

            AuthRoute.start(app);

            app.get("/",(req, res)=>{ShopController.index(req, res);});

            app.get("/shops/products",(req, res)=>{ShopsProductController.index(req, res);});
            app.get("/shops/products/:id",(req, res)=>{ShopsProductController.show(req, res);});

            app.get("/shops/carts",AuthMiddleware.auth, (req, res)=>{ShopsCartController.index(req, res);}); 
            app.post("/shops/carts",AuthMiddleware.auth, (req, res)=>{ShopsCartController.store(req, res);}); 
            app.delete("/shops/carts",AuthMiddleware.auth, (req, res)=>{ShopsCartController.destroy(req, res);}); 

            app.get("/shops/orders",AuthMiddleware.auth, (req, res)=>{ShopsOrderController.index(req, res);}); 
            app.post("/shops/orders",AuthMiddleware.auth, (req, res)=>{ShopsOrderController.store(req, res);});                  

            app.get("/admins/products",AuthMiddleware.auth, (req, res)=>{AdminsProductController.index(req, res);});
            app.get("/admins/products/create",AuthMiddleware.auth, (req, res)=>{AdminsProductController.create(req, res);});
            app.post("/admins/products",AuthMiddleware.auth, (req, res)=>{AdminsProductController.store(req, res);});
            app.get("/admins/products/:id/edit",AuthMiddleware.auth, (req, res)=>{AdminsProductController.edit(req, res);}); 
            app.put("/admins/products/:id",AuthMiddleware.auth, (req, res)=>{AdminsProductController.update(req, res);}); 
            app.delete("/admins/products/:id",AuthMiddleware.auth, (req, res)=>{AdminsProductController.destroy(req, res);});      

            app.all("*",(req, res)=>{ ErrorController.showStatus404(req, res);}); 
            
        }
}


export default Route ;
 
