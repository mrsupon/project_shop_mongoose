import User from '../../models/mongoose/user.js';
import EMail from '../../utils/email.js';
import bcrypt from 'bcryptjs';
import z from 'zod';
import Utility from '../../utils/utility.js';
import { validationResult } from 'express-validator';

class SignupController {
  static index(req, res) {}

  static create(req, res) {
    res.render('auth/signup.ejs', {
      products: null,
      pageTitle: 'Sign up',
      path: '/auth/signup/create',
      errorFields: req.flash('errorFields'),
      messages: req.flash(),
    });
  }

  static store(req, res) {
    const password = req.body.password.trim();
    const confirmPassword = req.body.confirmPassword.trim();
    const email = req.body.email.trim().toLowerCase();

    User.findOne({ email: email })
      .then((user) => {
        // Zod Input Validation//////////
        // const schema = z.object({
        //     body: z.object({
        //             email: z.string().email('Email should be /n valid and non-empty'),
        //             password: z.string().min(4,'Password should be /n at least 4 characters'),//.regex(new RegExp('/^\w+$/'),'Password should be /n an alphanumeric' ),//.regex(new RegExp('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'), 'Password should be /n contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
        //             confirmPassword: z.string().min(4,'Confirm password should be /n at least 4 characters'),
        //         })
        //         .refine((data) => {
        //             if(user)
        //                 return data.email !== user.email;
        //             else
        //                 return true;
        //             }, {
        //             message: 'E-Mail exits already /n Please pick a difference one.',
        //             path: ["email"],
        //         })
        //         .refine((data) => data.password === data.confirmPassword, {
        //             message: 'Passwords don&apos;t match',
        //             path: ["confirmPassword"],
        //         }),
        // });

        // const validateResult = Utility.validate(schema, req);  console.log( validateResult );
        //////////////////////////////////
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const validateErrors = Utility.validateErrors(errors);
          req.flash('error', validateErrors.errorMessages);
          req.flash('errorFields', validateErrors.errorFields);
          return res.status(422).redirect('/auth/signup/create');
        } else {
          bcrypt
            .hash(password, 12)
            .then((hashPassword) => {
              const user = new User({
                email: email,
                password: hashPassword,
                cart: { items: [] },
              });
              return user.save();
            })
            .then((result) => {
              req.flash('success', 'Please verify your account in email');
              res.redirect('/auth/login/create');
              new EMail().send('supon.sup@gmail.com', 'Verify Email', 'emails/test.ejs');
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));

    //User.findOne({email : email})
    //.then((user)=>{
    // if(user){
    //     req.flash("error", "pick a difference one."  );
    //     return res.redirect("/auth/signup/create");
    // }
    // else if(password.trim() !== confirmPassword.trim()){
    //     req.flash("error", "Confirm Password does&apos;t match"  );
    //     return res.redirect("/auth/signup/create");
    // }
    // bcrypt.hash(password,12)
    // .then(hashPassword=>{
    //     const user = new User({
    //     email:email,
    //     password: hashPassword,
    //     cart: {items:[]}
    //     })
    //     return user.save();
    // })
    // .then(result=>{
    //     res.redirect("/auth/login/create");
    //     new EMail().send('supon.sup@gmail.com', 'Verify Email', 'emails/test.ejs');
    // })
    // .catch( err=> console.log(err));
    //})
    //.catch( err=> console.log(err));
  }

  static edit(req, res) {}

  static update(req, res) {}

  static destroy(req, res) {}
}

export default SignupController;
