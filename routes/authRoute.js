import express from 'express';
import CsrfMiddleware from '../middlewares/csrfMiddleware.js';
import LoginController from '../controllers/auth/loginController.js';
import SignupController from '../controllers/auth/signupController.js';
import ResetPasswordController from '../controllers/auth/resetPasswordController.js';
import { checkSchema } from 'express-validator';
import ValidatorSchema from '../validators/validatorSchema.js';
import validatorMiddleware from '../middlewares/validatorMiddleware.js';

const AuthRoute = express.Router();

AuthRoute.get('/login/create', LoginController.create);
AuthRoute.post('/login', [CsrfMiddleware.csrf, validatorMiddleware.login], LoginController.store);
AuthRoute.delete('/logout', LoginController.destroy);

AuthRoute.get('/signup/create', SignupController.create);
AuthRoute.post('/signup', checkSchema(ValidatorSchema.signup), SignupController.store);

AuthRoute.get('/resetPassword/create', ResetPasswordController.create);
AuthRoute.post('/resetPassword', CsrfMiddleware.csrf, ResetPasswordController.store);
AuthRoute.get('/resetPassword/:token/edit', ResetPasswordController.edit);
AuthRoute.put('/resetPassword/:token', CsrfMiddleware.csrf, ResetPasswordController.update);

export default AuthRoute;
