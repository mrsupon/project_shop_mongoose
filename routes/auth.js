
import LoginController from "../controllers/auth/loginController.js"
import SignupController from "../controllers/auth/signupController.js"
import CsrfMiddleware from "../middlewares/csrfMiddleware.js"


class AuthRoute{
        static start(app){

            app.get("/login/create",CsrfMiddleware.csrf,(req, res)=>{LoginController.create(req, res);});
            app.post("/login",(req, res)=>{LoginController.store(req, res);}); 
            app.delete("/logout",(req, res)=>{LoginController.destroy(req, res);});

            app.get("/signup/create",(req, res)=>{SignupController.create(req, res);});            
            app.post("/signup",(req, res)=>{SignupController.store(req, res);}); 
            app.delete("/signup",(req, res)=>{SignupController.destroy(req, res);});  
        }
}


export default AuthRoute ;
 
