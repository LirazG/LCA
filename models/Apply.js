const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const ApplySchema = new Schema({
  name : {
    type:String,
    required:true
  },
  email : {
    type:String,
    required:true
  },
  phone : {
    type:String,
    required:true
  },
  question: {
    type:String,
    required:true
  },
  date: {
    type:Date,
    default:Date.now
  }

});

module.exports = Apply = mongoose.model('applications', ApplySchema);
