import { validationResult, checkSchema } from 'express-validator';

class ValidatorMiddleware {
  static errors = null; //{messages:[], fields:[]}

  static setErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      if (errors.array().length > 0) {
        let messageArr = errors.array().map((error) => error.msg);
        let fieldArr = errors.array().map((error) => error.path);
        ValidatorMiddleware.errors = { messages: messageArr, fields: fieldArr };
      } else {
        ValidatorMiddleware.errors = null;
      }
    }

    next();
  };

  static login = [
    checkSchema({
      email: {
        isEmail: { errorMessage: 'Email /n is invalid' },
      },
      password: {
        exists: { errorMessage: 'Password /n is required' },
        isString: { errorMessage: 'password /n should be string' },
        isLength: {
          options: { min: 4 },
          errorMessage: 'Password /n should be at least 4 characters',
        },
      },
    }),
    ValidatorMiddleware.setErrors,
  ];

  static signup = [
    checkSchema({
      email: {
        isEmail: { errorMessage: 'Email /n is invalid' },
      },
      password: {
        exists: { errorMessage: 'Password /n is required' },
        isString: { errorMessage: 'Password /n should be string' },
        isLength: {
          options: { min: 4 },
          errorMessage: 'Password /n should be at least 4 characters',
        },
      },
      confirmPassword: {
        exists: { errorMessage: 'Confirm Password /n is required' },
        isString: { errorMessage: 'Confirm Password /n should be string' },
        isLength: {
          options: { min: 4 },
          errorMessage: 'Confirm Password /n should be at least 4 characters',
        },
      },
    }),
    ValidatorMiddleware.setErrors,
  ];

  static example = [
    checkSchema({
      userName: {
        exists: {
          errorMessage: 'User name is required',
          options: { checkFalsy: true },
        },
        isString: { errorMessage: 'User name should be string' },
      },
      password: {
        exists: { errorMessage: 'Password is required' },
        isString: { errorMessage: 'password should be string' },
        isLength: {
          options: { min: 5 },
          errorMessage: 'Password should be at least 5 characters',
        },
      },
      email: {
        isEmail: { errorMessage: 'Please provide valid email' },
      },
      gender: {
        isString: { errorMessage: 'Gender should be string' },
        isIn: {
          options: [['Male', 'Female', 'Other']],
          errorMessage: 'Gender is invalid',
        },
      },
      dateOfBirth: {
        isDate: { errorMessage: 'DOB should be string' },
      },
      phoneNumber: {
        isString: { errorMessage: 'phone number should be string' },
        custom: (value) => {
          if (value.length !== 10) {
            return Promise.reject('Phone number should be 10 digits');
          } else {
            return true;
          }
        },
        errorMessage: 'Phone number should be 10 digits',
      },
    }),
    ValidatorMiddleware.setErrors,
  ];
}

export default ValidatorMiddleware;
