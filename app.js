/* jshint esversion: 6 */

var http = require("http");
var express = require("express");
var fs = require("fs");
var bodyParser = require('body-parser');

var app = express();

var models = require("./models/index.js");

models.sequelize.sync().then( () => {
  console.log("DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
});
