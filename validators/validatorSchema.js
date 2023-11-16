class ValidatorSchema {
  static login = {
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
  };

  static signup = {
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
  };

  static example = {
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
      options: (value) => {
        value.length === 10;
      },
      errorMessage: 'Phone number should be 10 digits',
    },
  };
}

export default ValidatorSchema;
