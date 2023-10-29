import EMail from "../../utils/email.js";
import crypto from "crypto"
import bcrypt from "bcryptjs"
import User from "../../models/mongoose/user.js";

class ResetPasswordController{

    static index(req, res){

    }

    static create(req, res){     
        res.render('auth/resetPassword.ejs', { 
                products: null ,
                pageTitle: 'Reset Password',
                path: '/auth/resetPassword/create',
                message: (req.flash("error")[0] || null)
        });

    }

    static store(req, res){ 
        crypto.randomBytes(32, (err, buffer)=>{
            if(err){
                console.log(err);
                return res.redirect('/auth/resetPassword/create');
            }
            const token = buffer.toString('hex');
            const data ={ resetToken: token, host: req.headers.host };
            User.findOne({email:req.body.email})
            .then( user => {
                if(!user){
                    req.flash('error','No account with that email found.');
                    return res.redirect('/auth/resetPassword/create')
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + (1*3600000);
                return user.save();
            } )
            .then(result => {
                res.redirect("/auth/login/create");  
                new EMail().send('supon.sup@gmail.com', 'Verify Email', 'emails/resetPassword.ejs', data); 
            } )
            .catch( err => console.log(err));

        } );
    }    

    static edit(req, res){
        const token = req.params.token;
        User.findOne( { resetToken: token, resetTokenExpiration: { $gt: Date.now() }  } )
        .then( user => {
            res.render('auth/editPassword.ejs', { 
                token: token ,
                pageTitle: 'Change New Password',
                path: '',
                message: (req.flash("error")[0] || null) 
            } );            
        } )
        .catch( err => console.log( err ) );
    }

    static update(req, res){
        const newPassword = req.body.newPassword; 
        const token = req.params.token;
        let foundUser;
        User.findOne( { resetToken: token, resetTokenExpiration: { $gt: Date.now() }  } )
        .then( user => {
            foundUser = user;
            return bcrypt.hash( newPassword, 12 );
        } )
        .then( hashedNewPassword => {
            foundUser.password = hashedNewPassword;
            foundUser.resetToken = undefined;
            foundUser.resetTokenExpiration = undefined;
            return foundUser.save();
        })
        .then( result => {
            res.redirect("/auth/login/create");
        } )
        .catch( err => console.log( err ) );
    } 

    static destroy(req, res){ 

    }   
}

export default ResetPasswordController ;




