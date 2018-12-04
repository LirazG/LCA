const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const admin = require('./routes/api/admin');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys_prod').mongoURI || require('./config/keys_dev').mongoURI;
// connect to mongoDB

mongoose.connect(db,{ useNewUrlParser: true })
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

app.use('/api/admin',admin);
app.use('/api/users',users);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000 ;

app.listen(port, () => console.log(`server running on port ${port}`));
