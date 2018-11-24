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
    checkIn:{
      dayCheckin:{
        type:Number
      },
      yearCheckin:{
        type:Number
      },
      monthCheckin:{
        type:Number
      }
    },
    checkOut:{
      dayCheckout:{
        type:Number
      },
      yearCheckout:{
        type:Number
      },
      monthCheckout:{
        type:Number
      }
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
