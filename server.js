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

// db.sequelize.sync({force: true}).then(function () {
//   app.listen(PORT, function () {
//     console.log("App listening on PORT " + PORT);
//     db.Teacher.create({
//       name: 'Jen',
//       email: 'jen@testteacher.com',
//       password: 'testpass',
//     }).then(function (teacher) {
//       console.log(teacher);
//       db.Students.bulkCreate([
//         {
//         firstName: 'Eyad',
//         lastName: 'Drakefan',
//         email: 'eyad@unc.edu',
//         imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/150px-Placeholder_no_text.svg.png',
//         TeacherId: 1
//       }, 
//       {
//         firstName: 'Henrietta',
//         lastName: 'likesDraketoo',
//         email: 'henrietta@unc.edu',
//         imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/150px-Placeholder_no_text.svg.png',
//         TeacherId: 1
//       },
//       {
//        firstName: 'India',
//         lastName: 'Arie',
//         email: 'india@unc.edu',
//         imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/150px-Placeholder_no_text.svg.png',
//         TeacherId: 1
//       },

//       {
//         firstName: 'Brittni',
//         lastName: 'Beyoncefan',
//         email: 'india@unc.edu',
//         imgUrl: 'http://img.usmagazine.com/social/beyonce-d5c55b42-2de9-48f4-84c4-bbd89bb622c8.jpg',
//         TeacherId: 1
//       }
//     ]).then(function (student) {
//         console.log(student);
//         db.Assignments.bulkCreate([
//           {
//           assignName: 'TechnicalInterview',
//           StudentId: 1
//         },
//         {
//           assignName: 'TechnicalInterview',
//           StudentId: 2
//         },
//         {
//           assignName: 'TechnicalInterview',
//           StudentId: 3
//         },
//         {
//           assignName: 'TechnicalInterview',
//           StudentId: 4
//         }
//         ]).then(function (student) {
//           console.log(student);
//           db.Grades.bulkCreate([
//             {
//             grade: 81,
//             AssignmentId: 1
//            },
//           {
//             grade: 101,
//             AssignmentId: 2
//           },
//           {
//             grade: 86,
//             AssignmentId: 3
//           },
//           {
//             grade: 91,
//             AssignmentId: 4
//           }
//           ]).then(function (value) {
//             console.log(value);

//             db.Students.findAll({
//               include: [{
//                 model: db.Assignments,
//                 include: [db.Grades]
//               }],
//               raw: true
//             }).then(function (student) {
//               console.log(student);
//             })
//           });

//         })

//       });

//     })


//   });
// });


db.sequelize.sync({
  // Force true deletes your data every time you restart
  force: true
}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    db.Teachers.create({
      name: 'Jen',
      email: 'jen@testteacher.com',
      password: 'testpass',
    }).then(function (teacher) {
      console.log(teacher);
      db.Students.bulkCreate([{
          name: 'Eyad Drakefan',
          email: 'eyad@unc.edu',
          imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/150px-Placeholder_no_text.svg.png',
          TeacherId: 1
        },
        {
          name: 'Henrietta likesDraketoo',
          email: 'henrietta@unc.edu',
          imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/150px-Placeholder_no_text.svg.png',
          TeacherId: 1
        },
        {
          name: 'India Arie',
          email: 'india@unc.edu',
          imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/150px-Placeholder_no_text.svg.png',
          TeacherId: 1
        },

        {
          name: 'Brittni Beyoncefan',
          email: 'india@unc.edu',
          imgUrl: 'http://img.usmagazine.com/social/beyonce-d5c55b42-2de9-48f4-84c4-bbd89bb622c8.jpg',
          TeacherId: 1
        }
      ]).then(function (teacher) {
        console.log(teacher);
        db.Cal_Events.bulkCreate([{
          eventName: 'Field Trip',
          eventDate: '2016-08-09 04:05:02',
          TeacherId: 1
        }]).then(function (student) {
          console.log(student);
          db.Assignments.bulkCreate([{
            assignName: 'TechnicalInterview',
          }]).then(function (student) {
            console.log(student);
            db.Grades.bulkCreate([{
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
});


