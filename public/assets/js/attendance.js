'use strict';
$(document).ready(function() {
  function datePickerInit() {
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      format: 'dd-mm-yyyy',
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
  }

  function getTeacher() {
    $.get('/api/teacher_data').then(function(teacher) {
      console.log(teacher);
      displayStudents(teacher);
    });
  }

  function displayStudents(teacher) {
    console.log(teacher);
    var id = teacher.id;
    $.get(`/api/students/${id}`).then(function(data) {
      console.log(data);
      // code to show data on the page
      var choices = ['Present', 'Present-Tardy', 'Absent'];
      for (var i = 0; i < data.length; i++) {
        var studentName = data[i]['name'];
        var studentId = data[i]['id'];
        var listItem = $(`
        <li class='collection-item'>
        <p>Student Id: ${studentId} ${studentName}</p>
        <form>
          ${generateDropdown(studentName, studentId, choices[0])}
          ${generateDropdown(studentName, studentId + 1, choices[1])}
          ${generateDropdown(studentName, studentId + 2, choices[2])}
        </form>
        </li>`);
        $('#append-here').append(listItem);
      }
    });
  }

  function generateDropdown(studentName, inputId, choices) {
    var dropDown = `
      <p> 
        <input class='with-gap' name=${studentName} id=${inputId} type='radio' value=${choices} />
        <label for=${inputId}> ${choices}</label>
      </p>`;
    return dropDown;
  }

  datePickerInit();
  getTeacher();
});
