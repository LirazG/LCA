const express = require('express');
const router = express.Router();

const Apply = require('../../models/Apply');
const Room = require('../../models/Room');

//load input validation
const validateFormInput = require('../../validation/form-validation');
const validateRoomReservation = require('../../validation/room-reserve-validation');

//@route   POST api/users/submit
//@desc    subbmit question
//@access  public
router.post('/submit', (req,res) => {
  const { errors, isValid } = validateFormInput(req.body);
  //validate form Input
  if(!isValid){
    return res.status(400).json(errors);
  }

  const question = new Apply ({
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    question:req.body.question
  });
  question.save();
  res.json({msg:"success"});
});

module.exports = router;

//@route   POST api/users/reserve
//@desc    subbmit reservation
//@access  public(for now)


router.post('/reserve',(req,res)=>{
  const { errors, isValid } = validateRoomReservation(req.body);
  //validate form Input
  if(!isValid){
    return res.status(400).json(errors);
  }

  const roomReservation = {
    year:Number(req.body.year),
    month:Number(req.body.month),
    day:Number(req.body.day)
  };

  const roomName = req.body.roomName;

//find room by name
  Room.findOne({roomName})
    .then(room => {
      if(!room){
        return res.status(404).json({msg:"room not found"});
      }
      //chack if date is taken
      let length = room.ocupied.length;
      let existOrNot = false;
      for(let i = 0;i<length;i++){
        if(room.ocupied[i].year !== roomReservation.year){
          continue;
        }
        if(room.ocupied[i].month !== roomReservation.month){
          continue;
        }
        if(room.ocupied[i].day !== roomReservation.day){
          continue;
        }
        existOrNot = true;
      }

      if(existOrNot){
        return res.status(404).json({msg:"the date for the room is taken"});
      } else {
        //if date not taken save to DB
        room.ocupied.push({
          day:roomReservation.day,
          month:roomReservation.month,
          year:roomReservation.year,
          customer:{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone:req.body.phone,
            email:req.body.email || ''
          }
        });
        room.save();
        return res.json({msg:"success"});
      }

    });
  });
