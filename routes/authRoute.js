
import LoginController from "../controllers/auth/loginController.js"
import SignupController from "../controllers/auth/signupController.js"
import ResetPasswordController from "../controllers/auth/resetPasswordController.js"



import CsrfMiddleware from "../middlewares/csrfMiddleware.js";

class AuthRoute{
        static init(app){

            app.get("/auth/login/create", LoginController.create);
            app.post("/auth/login", CsrfMiddleware.csrf, LoginController.store); 
            app.delete("/auth/logout", LoginController.destroy);

            app.get("/auth/signup/create", SignupController.create);            
            app.post("/auth/signup", SignupController.store);   

            app.get("/auth/resetPassword/create", ResetPasswordController.create); 
            app.post("/auth/resetPassword", CsrfMiddleware.csrf, ResetPasswordController.store); 
            app.get("/auth/resetPassword/:token/edit", ResetPasswordController.edit); 
            app.put("/auth/resetPassword/:token",CsrfMiddleware.csrf, ResetPasswordController.update);

        }
}


export default AuthRoute ;
 
