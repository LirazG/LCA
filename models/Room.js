const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema

const RoomSchema = new Schema({
  roomName:{
    type:String
  },
  maxGuests:{
    type:Number
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
      },
      email:{
        type:String,
      }
    }
  }]
});

module.exports = Room = mongoose.model('rooms', RoomSchema);
