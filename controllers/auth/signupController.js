import Product from "../../models/mongoose/product.js"
import User from "../../models/mongoose/user.js"
import bcrypt from "bcryptjs"

class SignupController{

    static index(req, res){

        // res.render('admins/products/index.ejs', {
        //     products: products ,
        //     pageTitle: 'Products',
        //     path: '/admins/products'
        //     });
    }

    static create(req, res){
        res.render('auth/signup.ejs', { 
                products: null ,
                pageTitle: 'Sign up',
                path: '/signup/create'
        });

    }

    static store(req, res){
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const email = req.body.email;
        User.findOne({email : email})
        .then((user)=>{  
            if(!user){
                bcrypt.hash(password,12)
                .then(hashPassword=>{
                    const user = new User({
                    email:email,
                    password: hashPassword,
                    cart: {items:[]}
                    })
                    user.save();     
                })
                .catch( err=> console.log(err));
            }   
            res.redirect("/login/create");     
        })
        .catch( err=> console.log(err));
    }    

    static edit(req, res){
    
    }

    static update(req, res){
 
    } 

    static destroy(req, res){ 
        // req.session.destroy(()=>{
        //     global.auth = null;
        //     res.redirect("/");
        // });
    } 

    
}

export default SignupController ;