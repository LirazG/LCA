const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRoomReservation(data){
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';


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

  if(data.email && !Validator.isEmail(data.email)){
    errors.email = 'email is invalid';
  }

  return {
    errors,
    isValid:isEmpty(errors)
  }
}
