const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFieldReservation(data){
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.hour = !isEmpty(data.hour) ? data.hour : '';


  if(Validator.isEmpty(data.phone)){
    errors.phone = 'phone is required';
  }

  if(data.phone && data.phone.replace(/\D/g,'').length !== data.phone.length){
    errors.phone = 'phone is invalid';
  }

  if(Validator.isEmpty(data.firstName)){
    errors.firstName = 'first name is required';
  }

  if(Validator.isEmpty(data.lastName)){
    errors.lastName = 'last name is required';
  }

  if(Validator.isEmpty(data.hour)){
    errors.hour = 'hour is required';
  }

  return {
    errors,
    isValid:isEmpty(errors)
  }
}
