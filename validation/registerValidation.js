const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = (data) => {
  let errors = {};

  // Check email field
  if (isEmpty(data.email)) {
    errors.email = "Email field cannot be empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Please provide a valid email";
  }

  //   Check password field
  if (isEmpty(data.password)) {
    errors.password = "Password field cannot be empty";
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters long";
  }

  //   Check name field
  if (isEmpty(data.name)) {
    errors.name = "Name field cannot be empty";
  } else if (!Validator.isLength(data.name, { min: 6, max: 30 })) {
    errors.name = "Name must be between 6 and 30 characters long";
  }

  //   Check confirm password field
  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password field cannot be empty";
  } else if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Password fields must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
