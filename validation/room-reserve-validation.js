const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRoomReservation(data){
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.dayCheckin = !isEmpty(data.dayCheckin) ? data.dayCheckin : '';
  data.dayCheckout = !isEmpty(data.dayCheckout) ? data.dayCheckout : '';
  data.yearCheckin = !isEmpty(data.yearCheckin) ? data.yearCheckin : '';
  data.yearCheckout = !isEmpty(data.yearCheckout) ? data.yearCheckout : '';
  data.monthCheckin = !isEmpty(data.monthCheckin) ? data.monthCheckin : '';
  data.monthCheckout = !isEmpty(data.monthCheckout) ? data.monthCheckout : '';


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

  if(data.yearCheckin > data.yearCheckout){
    errors.date = 'invalid check-in time (year)';
  } else if (data.yearCheckin === data.yearCheckout){
    if(data.monthCheckin > data.monthCheckout){
      errors.date = 'invalid check-in time (month)';
    } else if(data.monthCheckin === data.monthCheckout){
      if(data.dayCheckin >= data.dayCheckout){
        errors.date = 'invalid check-out time (day)';
      }
    }
  }


  return {
    errors,
    isValid:isEmpty(errors)
  }
}
