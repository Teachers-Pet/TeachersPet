$(document).ready(function() {
  // store logged in teacher's id
  var id;
  // initialize materialize
  $('.modal').modal();
  $('.button-collapse ').sideNav();
  $('.button-collapse').sideNav('hide');
  $('.dropdown-button').dropdown();

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

  $.get('/api/teacher_data', function(data) {
    var teacherName = data.name;
    id = data.id;
    $('#teacher-name').text(teacherName + "'s");
  });

  //add event button
  $('#submit-event-btn').on('click', function(event) {
    var eventName = $('#event-name').val().trim();
    var eventDate = $('#event-date').val().trim();
  });

  //add student button
  $('#add-student-btn').on('click', function(event) {
    var newStudent = {
      name: $('#first-name').val().trim() + $('#last-name').val().trim(),
      imgUrl: $('#img-url').val().trim(),
      email: $('#email').val().trim(),
      TeacherId: id
    };
    // send an AJAX POST-request with jQuery
    $.post('/api/students', newStudent)
      // on success, run this callback
      .done(function(data) {
        alert('Adding student...');
      });

    // empty each input box by replacing the value with an empty string
    $('#first-name').val('');
    $('#last-name').val('');
    $('#email').val('');
    location.href = '/class';
  });

  $('#submit-doc-btn').on('click', function(event) {
    event.preventDefault();
    var formData = new FormData();
    formData.append('pdf', $('input[type=file]')[0].files[0]);
    $.ajax({
      url: '/api/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false
    }).then(function(uploadDoc) {
      console.log(uploadDoc);
      //need to render get request to AWS for temp embedded urls to display persisted documents
      console.log('document has successfully uploaded');
      location.href = '/class';
    });
  });

  $.get('/api/upload').then(function(data) {
    for (var i = 0; i < data.length; i++) {
      var newDocument = `<li> <a href=${data[i].url} target="_blank">${data[i].key}</a></li>`;
      $('#append-urls-here').append(newDocument);
    }
  });

  // Whenever someone clicks a student
  // $(document).on("click", ".selected-student", function () {
  //   var thisId = $(this).attr("id");
  //   console.log(thisId);
  // });
});
