const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAdminLoginInput(data){
  let errors = {};

  data.userName = !isEmpty(data.userName) ? data.userName : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if(Validator.isEmpty(data.userName)){
    errors.userName = 'user name is required';
  }

  if(Validator.isEmpty(data.password)){
    errors.password = 'password is required';
  }

  return {
    errors,
    isValid:isEmpty(errors)
  }
}
