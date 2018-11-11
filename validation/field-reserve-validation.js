const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFieldReservation(data){
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.hourCheckin = !isEmpty(data.hourCheckin) ? data.hourCheckin : '';
  data.hourCheckout = !isEmpty(data.hourCheckout) ? data.hourCheckout : '';

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

  if(Validator.isEmpty(data.hourCheckin)){
    errors.hourCheckin = 'check in hour is required';
  }

  if(Validator.isEmpty(data.hourCheckout)){
    errors.hourCheckout = 'check out hour is required';
  }

  if(data.hourCheckin > data.hourCheckout){
    errors.hourCheckout = 'check in hour is after the checkout hour';
  }

  if(data.hourCheckin - data.hourCheckout === 0){
    errors.hourCheckout = '1 hour minimum is required';
  }

  return {
    errors,
    isValid:isEmpty(errors)
  }
}
