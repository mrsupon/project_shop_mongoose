
class AuthMiddleware{

    static auth (req, res, next) {  //protect at route
        if(!req.session.isLoggedIn){
            res.redirect("/auth/login/create");
        }
        next();
    }

    static setLocals(req, res, next) {   //middleware regist  
        if(!req.session.isLoggedIn) 
            res.locals.auth = null;      
        else
            res.locals.auth = req.session.user;             

        next();
    }
}


export default AuthMiddleware;
