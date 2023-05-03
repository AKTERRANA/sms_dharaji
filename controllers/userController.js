require('dotenv').config();
const { User } = require("../model/userModel");
const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.jwtSecret;

module.exports = {
  createUser: (req, res) => {
    User.find({ email: req.body.values.email }).then((resp) => {
      if (resp.length > 0) {
        res.status(200).json({ message: "Email Already Exist!" });
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.values.password, salt, function (err, hash) {
            if (!err) {
              const newUser = new User({
                _id: mongoose.Types.ObjectId(),
                email: req.body.values.email,
                username: req.body.values.username,
                img_url: req.body.values.image_url,
                password: hash,
              });

              newUser
                .save()
                .then((savedUser) => {
                  console.log("Saved User Message", savedUser);
                  res
                    .status(200)
                    .json({ message: "New User Saved Successfully!" });
                })
                .catch((e) => {
                  res
                    .status(500)
                    .json({ message: "There is an Unknown Error" });
                  console.log("There is an Error in saving New User");
                });
            } else {
              res.status(500).json({ message: "There is an Unknown Error" });
            }
          });
        });
      }
    });
  },

  login: (req, res) => {
    console.log("calling")
    User.find({ email: req.body.values.email }).then((resp) => {
      bcrypt.compare(req.body.values.password, resp[0].password, (err,bycriptResp)=>{
        if(!err){
          if(bycriptResp){ 
            jwt.sign({ userId: resp[0]._id, username: resp[0].username}, jwtSecret, (err, token)=>{
              if(!err){

                res.header("Authorization", token)

                res.cookie('Authorization',token, { maxAge: 900000, httpOnly: true })

                res.status(200).json({ message: "Success Login"})
              }
            })
          }else{
            res.status(401).json({ message: "Authentication Falied !"})}
        }
      })
    }).catch(err=>{
      console.log("Error in loging in")
      res.status(401).json({message: "User Not Found"})
    })
  },
  signOut:(req, res)=>{
    
    res.header("Authorization", '')
    res.status(200).json({message: "Sign Out Successfully"})
  },
  isAuth:(req, res)=>{
    let token =  req.header("Authorization");
    console.log("token", token)
    if(!token){
       res.status(200).json({success:false, message: "You Are Not Authorized!"})
    }else{
        jwt.verify(token,jwtSecret, (err, decoded)=>{
            if(!err){
                req.user = decoded;
                  res.status(200).json({success:true, data: decoded});
            }else{
              res.status(200).json({success:false, message: "You Are Not Authorized!"})
            }
        } )
    }
  }
};
