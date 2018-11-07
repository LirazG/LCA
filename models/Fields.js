const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema

const FieldSchema = new Schema({
  fieldName:{
    type:String
  },
  ocupied:[{
    id:{
      type:mongoose.Schema.Types.ObjectId
    },
    day:{
      type:Number
    },
    year:{
      type:Number
    },
    month:{
      type:Number
    },
    hour:{
      type:Number
    },
    customer:{
      firstName:{
        type:String,
        required:true
      },
      lastName:{
        type:String,
        required:true
      },
      phone:{
        type:String,
        required:true
      }
    }
  }]
});

module.exports = Field = mongoose.model('fields', FieldSchema);
