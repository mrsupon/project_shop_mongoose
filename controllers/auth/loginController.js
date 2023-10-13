import Product from "../../models/mongoose/product.js"
import User from "../../models/mongoose/user.js"
import bcrypt from "bcryptjs"

class LoginController{

    static index(req, res){

        // res.render('admins/products/index.ejs', {
        //     products: products ,
        //     pageTitle: 'Products',
        //     path: '/admins/products'
        //     });
    }

    static create(req, res){
        res.render('auth/login.ejs', { 
                products: null ,
                pageTitle: 'Login',
                path: '/login/create'
        });

    }

    static store(req, res){
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({email : email})
        .then((user)=>{  
            if(user){
                bcrypt.compare(password, user.password)
                .then(result=>{
                    if(result === true){   
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        req.session.save();

                        res.redirect("/");                        
                    }
                    else
                        res.redirect("/login/create"); 
                })
                .catch( err=> console.log(err));
            } 
            else    
                res.redirect("/login/create");         

        })
        .catch( err=> console.log(err));
    }    

    static edit(req, res){
    
    }

    static update(req, res){
 
    } 

    static destroy(req, res){ 
        req.session.destroy((result)=>{
            res.locals.auth=null;
            res.redirect("/");
        });
    } 

    
}

export default LoginController ;