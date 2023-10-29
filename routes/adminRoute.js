import AdminsProductController from "../controllers/admins/productController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";


class AdminRoute{
    static init(app){

        app.get("/admins/products",AuthMiddleware.auth, AdminsProductController.index);
        app.get("/admins/products/create",AuthMiddleware.auth, AdminsProductController.create);
        app.post("/admins/products",AuthMiddleware.auth, AdminsProductController.store);
        app.get("/admins/products/:id/edit",AuthMiddleware.auth, AdminsProductController.edit); 
        app.put("/admins/products/:id",AuthMiddleware.auth, AdminsProductController.update); 
        app.delete("/admins/products/:id",AuthMiddleware.auth, AdminsProductController.destroy);  
    }
}


export default AdminRoute ;