const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys = require('../../config/keys');
const Admin = require('../../models/Admin');

//load input validation
const validateAdminLoginInput = require('../../validation/admin-login');

//@route   POST api/admin/login
//@desc    login admin
//@access  public
router.post('/login', (req,res) => {
  const { errors, isValid } = validateAdminLoginInput(req.body);
  //check validation
  if(!isValid){
    return res.status(400).json(errors);
  }

  const userName = req.body.userName;
  const password = req.body.password;

//find the admin user by email
  Admin.findOne({userName})
    .then(admin =>{
      if(!admin){
        errors.userName = 'user not found'
        return res.status(404).json(errors);
      }

      //check password match
      bcrypt.compare(password,admin.password)
        .then(isMatch => {
          if(isMatch){
            //user matched
            const payload = {id:admin.id,userName:admin.userName}
            //sign jsonwebtoken
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn:3600 },
              (err, token) => {
                res.json({
                  success:true,
                  token:'Bearer ' + token
                });
              }
            );
          } else {
            errors.password = 'password incorrect'
            return res.status(400).json(errors);
          }
        })
    })
  });

//@route   GET api/admin/applications
//@desc    list of all form applications
//@access  private

router.get('/applications',passport.authenticate('jwt',{ session:false }),(req,res)=>{
  res.json({msg:"success"});
});

module.exports = router;
