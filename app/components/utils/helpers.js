var axios = require('axios');

var helpers = {
  getStudents: function() {
    // first we need to get the teacher's id
    return axios.get('/api/teacher_data').then(function(teacher) {
      var id = teacher.data.id;
      console.log(teacher.data);
      console.log("react is getting the teacher's id ", id);
      // then we can retrieve all students under this teacher
      return axios.get('/api/students/' + id).then(function(students) {
        console.log(students);
        return students;
      });
    });
  }
};

module.exports = helpers;
