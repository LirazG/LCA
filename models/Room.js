const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const RoomSchema = new Schema({
  name:{
    type:String
  },
  maxGuests:{
    type:Number
  },
  ocupied:[{
    day:{
      type:Number
    },
    year:{
      type:Number
    },
    month:{
      type:Number
    }
  }]
});

module.exports = Room = mongoose.model('rooms', RoomSchema);
