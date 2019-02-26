/* jshint esversion: 6 */

var express = require('express');
var router = express.Router();
var models = require("../models/index.js");
var crypto = require('crypto');
/* GET users listing. */

router.get('/', function(req, res, next) {
  if(req.cookies) {
    console.log(req.cookies);
  }
  res.send("환영합니다~");
});

router.get('/sign_up', function(req, res, next) {
  res.render("user/signup");
});


router.post("/sign_up", function(req,res,next){
    let body = req.body;

    let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash('sha512').update(inputPassword + salt).digest("hex");
    console.log(hashPassword);
    models.User.create({
        name: body.userName,
        email: body.userEmail,
        phone: body.phone,
        password: hashPassword,
        salt: salt
    })
    .then( result => {
        res.redirect("/users/sign_up");
    })
    .catch( err => {
        console.log(err);
    });
});

router.get('/login', function(req, res, next) {
  let session = req.session;
  console.log(session);
  res.render("user/login", {
    session: session
  });
});


router.post("/login", function(req,res,next){
    let body = req.body;

    models.User.find({
        where: {email : body.userEmail}
    })
    .then( result => {
        let dbPassword = result.dataValues.password;

        let inputPassword = body.password;
        let salt = result.dataValues.salt;
        let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

        if(dbPassword === hashPassword){
            console.log("비밀번호 일치");
            req.session.email = body.userEmail;
            /*
            res.cookie("user", body.userEmail, {
              expires: new Date(Date.now() + 900000),
              httpOnly: true
            });
            */
            res.redirect("/users/login");
        }
        else{
            console.log("비밀번호 불일치");
            res.redirect("/users/login");
        }
    })
    .catch( err => {
        console.log(err);
    });
});


router.get("/logout", function(req,res,next){
    req.session.destroy();
    res.clearCookie('sid');

    res.redirect("/users/login");
});


module.exports = router;
