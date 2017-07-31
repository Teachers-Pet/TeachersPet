var db = require('../models');
const bodyParser = require('body-parser');

module.exports = function(app) {
  // parse application/json
  app.use(bodyParser.json());

  //route for retrieving all students associated with a specific teacher
  app.get('/api/students/:id', function(req, res) {
    var id = req.params.id;
    db.Students
      .findAll({
        where: { TeacherId: id }
      })
      .then(function(results) {
        res.json(results);
      });
  });

  app.post('/api/students', function(req, res) {
    db.Students.create(req.body).then(function(students) {
      res.json(students);
    });
  });

   //route for retrieving all students in general
  app.get('/api/students/', function(req, res) {
    var id = req.params.id;
    db.Students
      .findAll({
      })
      .then(function(results) {
        res.json(results);
      });
  });

  //route for retrieving all assignments
  app.get('/api/assignments', function(req, res) {
    db.Assignments.findAll({}).then(function(results) {
      res.json(results);
    });
  });



  // route for saving a new assignment
  app.post('/api/assignments', function(req, res) {
    db.Assignments
      .create({
        assignName: req.body.assignName
      })
      .then(function(assignment) {
        res.json(assignment);
      });
  });

  app.get('/api/attendance', function(req, res) {
    db.Dates
      .findAll({
        include: [
          {
            model: db.Attendance,
            include: [
              {
                model: db.Students
              }
            ]
          }
        ]
      })
      .then(function(currDate) {
        res.json(currDate);
      });
  });

  app.post('/api/attendance', function(req, res) {
    /* 
          JSON sent from client should look like: 
              [
                {
                  attendanceDate: "2017-07-31"
                }, 
                {
                  studentId: req.body.StudentId, 
                  presence: ["Present", "Present-Tardy", "Absent"]
                }, 
                {
                  studentId: req.body.StudentId, 
                  presence: ["Present", "Present-Tardy", "Absent"]
                }
              ]
    */
    var currAttendance = req.body;
    var attendanceDate = currAttendance[0].attendanceDate;
    db.Dates
      .create({
        schoolDates: attendanceDate
      })
      .then(function(savedDate) {
        for (var i = 1; i < currAttendance.length; i++) {
          db.Attendance
            .create({
              DateId: savedDate.id,
              StudentId: currAttendance[i].StudentId,
              presence: currAttendance[i].presence
            })
            .then(function(createdAttendance) {
              console.log(createdAttendance.dataValues);
              updatedAttendance.push(createdAttendance.dataValues);
            });
        }
        res.send(`sucessfully updated attendance for students for ${currAttendance[0].attendanceDate}`);
      });
  });
};
