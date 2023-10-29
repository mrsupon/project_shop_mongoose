import ErrorController from "../controllers/errorController.js";
import AuthRoute from "./authRoute.js";
import AdminRoute from "./adminRoute.js";
import ShopRoute from "./shopRoute.js";

class Route{
        static init(app){          

            AuthRoute.init(app);
            AdminRoute.init(app);
            ShopRoute.init(app);
            

            app.all("*", ErrorController.showStatus404);   
        }
}

export default Route ;
 
