import User from '../../models/mongoose/user.js';
import bcrypt from 'bcryptjs';
import z from 'zod';
import Utility from '../../utils/utility.js';
import OldInputMiddleware from '../../middlewares/oldInputMiddleware.js';
import { validationResult } from 'express-validator';
import ValidatorMiddleware from '../../middlewares/validatorMiddleware.js';

class LoginController {
  static index(req, res) {
    // res.render('admins/products/index.ejs', {
    //     products: products ,
    //     pageTitle: 'Products',
    //     path: '/admins/products'
    //     });
  }

  static create(req, res) {
    res.render('auth/login.ejs', {
      products: null,
      pageTitle: 'Login',
      path: '/auth/login/create',
      errorFields: req.flash('errorFields'),
      messages: req.flash(),
      //message: (req.flash("error")[0] || null)
    });
  }

  static store(req, res) {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();

    User.findOne({ email: email })
      .then((user) => {
        // Zod Input Validation//////////
        // const schema = z.object({
        //   body: z
        //     .object({
        //       email: z.string().email('E-mail should be /n valid and non-empty'),
        //       password: z.string().min(4, 'Password should be /n at least 4 characters'), //.regex(new RegExp('/^\w+$/'),'Password should be /n an alphanumeric' ),//.regex(new RegExp('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'), 'Password should be /n contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
        //     })
        //     .refine((data) => user || false, {
        //       message: 'E-Mail doesdon&apos;t exits',
        //       path: ['email'],
        //     }),
        // });

        // const validateResult = Utility.validate(schema, req);
        ////////////////////////////////

        const errors = ValidatorMiddleware.errors;

        if (errors) {
          //const validateErrors = Utility.validateErrors(errors);
          req.flash('error', errors.messages);
          req.flash('errorFields', errors.fields);
          return res.status(422).redirect('/auth/login/create');
        }

        //     else{
        bcrypt
          .compare(password, user.password)
          .then((doMatch) => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save((err) => {
                req.flash('success', 'Login succesfully');
                res.redirect('/');
              });
            } else {
              req.flash('error', 'Password is wrong');
              req.flash('errorFields', 'password');
              res.redirect('/auth/login/create');
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  static edit(req, res) {}

  static update(req, res) {}

  static destroy(req, res) {
    req.session.destroy((result) => {
      OldInputMiddleware.clear();
      res.redirect('/');
    });
  }
}

export default LoginController;
