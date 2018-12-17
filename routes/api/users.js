const express = require('express');
const router = express.Router();

const Apply = require('../../models/Apply');
const Room = require('../../models/Room');
const Field = require('../../models/Fields');

//load input validation
const validateFormInput = require('../../validation/form-validation');
const validateRoomReservation = require('../../validation/room-reserve-validation');
const validateFieldReservation = require('../../validation/field-reserve-validation');


//@route   GET api/users/reserve/field
//@desc    get all the taken dates
//@access  public

router.get('/reserve/field', (req,res) => {
  Field.find({})
    .then(fields => {
      let dates =[];
      dates = fields.map((field)=>{
        var obj = {fieldName:field.fieldName,dates:{}}
        for(let i in field.ocupied){
          if(Number(i)>-1){
            obj.dates[i] = {
              year:field.ocupied[i].year,
              month:field.ocupied[i].month,
              day:field.ocupied[i].day,
              hours:field.ocupied[i].hours
            };
          }
        }
        return obj;
      });
      res.send(dates)
    });
});

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

//@route   GET api/users/reserve/room
//@desc    get taken dates for a room
//@access  public

router.get('/reserve/room', (req,res)=>{
  Room.find({})
    .then( rooms =>{
      const newRoomDataArray = [];
      for(let i in rooms){
        let obj = {};
        let key = rooms[i].roomName;
        obj[key] = [];
        for(let j = 0; j < rooms[i].ocupied.length; j++){
          obj[key].push({checkIn:rooms[i].ocupied[j].checkIn,checkOut:rooms[i].ocupied[j].checkOut})
        }
        newRoomDataArray.push(obj);
      }
      res.json(newRoomDataArray) ;
    })
    .catch(err => {return res.status(400)})
});

//@route   POST api/users/reserve/room
//@desc    subbmit room reservation
//@access  public(for now)
router.post('/reserve/room',(req,res)=>{
  const { errors, isValid } = validateRoomReservation(req.body);
  //validate form Input
  if(!isValid){
    return res.status(400).json(errors);
  }

  const roomReservation = {
    yearCheckin:Number(req.body.yearCheckin),
    monthCheckin:Number(req.body.monthCheckin),
    dayCheckin:Number(req.body.dayCheckin),
    dayCheckout:Number(req.body.dayCheckout),
    monthCheckout:Number(req.body.monthCheckout),
    yearCheckout:Number(req.body.yearCheckout)
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
      let continueOrNot = true;
      //calculate how many days customer stays
      let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      let checkIn = new Date(roomReservation.yearCheckin,roomReservation.monthCheckin,roomReservation.dayCheckin).setHours(0, 0, 0);
      let checkOut = new Date(roomReservation.yearCheckout,roomReservation.monthCheckout,roomReservation.dayCheckout).setHours(0, 0, 0);

      let numberOfDatesToLoop = Math.round(Math.abs((new Date(checkIn).getTime() - new Date(checkOut).getTime())/(oneDay)));


      for(let i = 0;i < length;i++){
        let counter = checkIn;
        let roomCheckin = new Date(room.ocupied[i].checkIn.yearCheckin,room.ocupied[i].checkIn.monthCheckin,room.ocupied[i].checkIn.dayCheckin).setHours(0, 0, 0);
        let roomCheckout = new Date(room.ocupied[i].checkOut.yearCheckout,room.ocupied[i].checkOut.monthCheckout,room.ocupied[i].checkOut.dayCheckout).setHours(0, 0, 0);

        for(let j = 0; j < numberOfDatesToLoop; j++){
          if(counter >= roomCheckin && counter < roomCheckout){
            console.log('date is taken');
            console.log(new Date(counter).getFullYear(),new Date(counter).getMonth(),new Date(counter).getDate())
            continueOrNot = false;
            break;
          } else {
            counter = new Date(counter).setDate(new Date(counter).getDate() + 1);
          }
        }

        if(continueOrNot){
          continue;
        }

        existOrNot = true;
        break;
      }

///////////

      if(existOrNot){
        return res.status(400).json({msg:"the dates for the room is taken"});
      } else {
        //if date not taken save to DB
        room.ocupied.push({
          checkIn:{
            dayCheckin:roomReservation.dayCheckin,
            yearCheckin:roomReservation.yearCheckin,
            monthCheckin:roomReservation.monthCheckin
          },
          checkOut:{
            dayCheckout:roomReservation.dayCheckout,
            yearCheckout:roomReservation.yearCheckout,
            monthCheckout:roomReservation.monthCheckout
          },
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


//@route   POST api/users/reserve/field
//@desc    subbmit field reservation
//@access  public(for now)


router.post('/reserve/field',(req,res)=>{
  const { errors, isValid } = validateFieldReservation(req.body);
  //validate form Input
  if(!isValid){
    return res.status(400).json(errors);
  }

  const fieldReservation = {
    year:Number(req.body.year),
    month:Number(req.body.month),
    day:Number(req.body.day),
    hourCheckin:Number(req.body.hourCheckin),
    hourCheckout:Number(req.body.hourCheckout)
  };

  const fieldName = req.body.fieldName;

//find field by name
  Field.findOne({fieldName})
    .then(field => {
      if(!field){
        return res.status(404).json({msg:"field not found"});
      }
      //chack if date is taken
      let length = field.ocupied.length;
      let existOrNot = false;
      let continueOrNot = true;

      for(let i = 0;i<length;i++){

        if(field.ocupied[i].year !== fieldReservation.year){
          continue;
        }
        if(field.ocupied[i].month !== fieldReservation.month){
          continue;
        }
        if(field.ocupied[i].day !== fieldReservation.day){
          continue;
        }

        for(let j = fieldReservation.hourCheckin; j < fieldReservation.hourCheckout; j++){
          // counter to check if hours between checkin and checkout are availible
          let counter = fieldReservation.hourCheckin;
          if(!field.ocupied[i].hours.includes(counter)){
            counter++;
          } else {
            continueOrNot = false;
          }
        }

        if(continueOrNot){
          continue;
        }

        existOrNot = true;
      }

      if(existOrNot){
        return res.status(400).json({msg:"the time for the field is taken"});
      } else {
        //if date not taken save to DB
        let newHourArr = [];
        let counter = fieldReservation.hourCheckin
        for(let i = fieldReservation.hourCheckin; i<fieldReservation.hourCheckout; i++){
          newHourArr.push(counter);
          counter++;
        }
        field.ocupied.push({
          day:fieldReservation.day,
          month:fieldReservation.month,
          year:fieldReservation.year,
          hours:newHourArr,
          customer:{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone:req.body.phone
          }
        });
        field.save();
        return res.json({msg:"success"});
      }
    });
  });


module.exports = router;
