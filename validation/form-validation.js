const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFormInput(data){
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.phone = !isEmpty(data.phone) ? data.phone : 0;
  data.question = !isEmpty(data.question) ? data.question : '';


  if(data.phone && data.phone.replace(/\D/g,'').length !== data.phone.length){
    errors.phone = 'phone is invalid';
  } else {
    data.phone = Number(data.phone);
  }

  if(Validator.isEmpty(data.name)){
    errors.name = 'name is required';
  }

  if(Validator.isEmpty(data.email)){
    errors.email = 'email is required';
  }

  if(!Validator.isEmail(data.email)){
    errors.email = 'email is invalid';
  }

  if(Validator.isEmpty(data.question)){
    errors.question = 'question is required';
  }

  return {
    errors,
    isValid:isEmpty(errors)
  }
}
