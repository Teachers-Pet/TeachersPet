'use strict';
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// Authentication dependencies
var passport = require('passport');
var session = require('express-session');
const fileUpload = require('express-fileupload');
// var sslRootCAs = require('ssl-root-cas/latest')
// sslRootCAs.inject(); 
require("node-jsx").install(); 

// Models
var db = require("./models");

// Initialize app method
let app = express();

// set PORT variable
const PORT = process.env.PORT || 8080;

//Static directory
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// parse application/json
app.use(bodyParser.json());

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//Routes
//=================================================
require('./routes/htmlRoutes')(app);
// Authentication routes
require('./routes/authRoutes.js')(app, passport);
// load passport strategies
require('./config/passport/passport.js')(passport, db.Teacher);
//load amazon web service route 
// require('./routes/upload')(app);
require('./routes/apiRoutes')(app); 

  // DEV ONLY!!: 
  // use code below to force true if prevented by sequelize error 
  // db
  //   .sequelize
  //   .query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true})
  //   .then(function(results) {
  //       db.sequelize.sync({force: true}); 
  //   }); 

db.sequelize.sync({force: true}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    db.Teacher.create({
      name: 'Jen',
      email: 'jen@testteacher.com',
      password: 'testpass',
    }).then(function (teacher) {
      console.log(teacher);
      db.Students.bulkCreate([
        {
        name: 'Eyad',
        email: 'eyad@unc.edu',
        TeacherId: 1
      }, 
      {
        name: 'Henrietta',
        email: 'henrietta@unc.edu',
        TeacherId: 1
      },
      {
        name: 'India',
        email: 'india@unc.edu',
        TeacherId: 1
      },
      {
        name: 'Brittni',
        email: 'brittni@unc.edu',
        TeacherId: 1
      }
    ]).then(function (student) {
        console.log(student);
        db.Assignments.bulkCreate([
          {
           assignName: 'TechnicalInterview',
          }
        ]).then(function (student) {
          console.log(student);
          db.Grades.bulkCreate([
            {
            grade: 81,
            AssignmentId: 1, 
            StudentId: 1, 
           },
          {
            grade: 101,
            AssignmentId: 1,
            StudentId: 2,
          },
          {
            grade: 86,
            AssignmentId: 1,
            StudentId: 3, 
          },
          {
            grade: 91,
            AssignmentId: 1,
            StudentId: 4
          }
          ]).then(function (value) {
            console.log(value);
            db.Students.findAll({
              include: [{
                model: db.Grades,
                include: [{
                  model: db.Assignments
                }]
              }],
              raw: true
            }).then(function (student) {
              console.log(student);
            }); 
          });
        }); 
      });
    }); 

  });
});


