$(document).ready(function() {
  getTeacher();
  function getTeacher() {
    $.get('/api/teacher_data').then(function(teacher) {
      displayStudents(teacher);
    });
  }
  function displayStudents(teacher) {
    var teacherEmail = {
      email: 'jen@testteacher.com'
    };
    console.log(teacher);
    $.post('/api/students', teacherEmail).then(function(data) {
      console.log(data);
      // code to show data on the page
      for (var i = 0; i < data.length; i++) {
        var listItem = $('<li>');

        var studentInfo = data[i]['Students.name'];
        listItem.append(`<h2>${studentInfo}</h2>`);
        $('#append-here').append(listItem);
      }
    });
  }
});
