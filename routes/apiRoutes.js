var db = require('../models');
const bodyParser = require('body-parser');

module.exports = function(app) {
  // parse application/json
  app.use(bodyParser.json());

  //route for retrieving all students
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
};
