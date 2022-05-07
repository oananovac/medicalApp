const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateAppointment = (data) => {
  let errors = {};

  if (isEmpty(data.content)) {
    errors.content = "Content field cannot be empty.";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateAppointment;
