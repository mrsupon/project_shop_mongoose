import ErrorController from "../controllers/errorController.js";
import AuthRoute from "./authRoute.js";
import AdminRoute from "./adminRoute.js";
import ShopRoute from "./shopRoute.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

class Route{
        static init(app){          

            AuthRoute.init(app);
            AdminRoute.init(app);
            ShopRoute.init(app);
            
            app.get("/500",AuthMiddleware.auth, ErrorController.show500);
            //app.get("/404",AuthMiddleware.auth, ErrorController.show404);
            app.all("*", AuthMiddleware.auth, ErrorController.show404);    
        }
}

export default Route ;
 
