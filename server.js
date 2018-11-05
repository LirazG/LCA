const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const admin = require('./routes/api/admin');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongoDB

mongoose.connect(db)
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

app.use('/api/admin',admin);
app.use('/api/users',users);

// const Room = require('./models/Room');
// const namesArr = ['pima','tanguis','mambo tango','tejidos peruanos','cuatro de la luna','seul 88','vichama room','cuarto del sol','shangai room','retro room'];
// const pplArr = [2,4,3,2,2,2,2,2,2,3];
//
// for (var i=0;i<10;i++){
//  let room = new Room({
//    name:namesArr[i],
//    maxGuests:pplArr[i],
//    ocupied:[]
//  });
//  room.save();
// }

const port = process.env.PORT || 5000 ;

app.listen(port, () => console.log(`server running on port ${port}`));
