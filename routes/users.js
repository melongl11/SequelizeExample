var express = require('express');
var router = express.Router();
var models = require("../models/index.js");
var crypto = require('crypto');
/* GET users listing. */
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
        console.log(err)
    })
})

module.exports = router;
