
class AuthMiddleware{

    static auth (req, res, next) {  //protect at route
        if(!req.session.isLoggedIn){
            res.redirect("/login/create");
        }
        next();
    }

    static setLocals(req, res, next) {   //protect view 
                 
        if(req.session.isLoggedIn){
            res.locals.auth = req.session.user;       
        }
        else
            res.locals.auth = null;
        return next();
    }
}


export default AuthMiddleware;
