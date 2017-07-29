$(document).ready(function () {
        // initialize materialize
        $('.modal').modal();
        $(".button-collapse ").sideNav();
        $('.button-collapse').sideNav('hide');
        $(".dropdown-button").dropdown();

        $('.datepicker').pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15, // Creates a dropdown of 15 years to control year,
          today: 'Today',
          clear: 'Clear',
          close: 'Ok',
          closeOnSelect: false // Close upon selecting a date,
        });
      //add event button
      $("#submit-event-btn").on("click", function(event) {
        var eventName = $("#event-name").val().trim();
        var eventDate = $("#event-date").val().trim();
        console.log("My event is" + eventName + ". It will happen on." + eventDate);
        });

  //add student button
  $("#add-student-btn").on("click", function (event) {

    var newStudent = {
      firstName: $("#first-name").val().trim(),
      lastName: $("#last-name").val().trim(),
      imgUrl: $("#img-url").val().trim(),
      email: $("#email").val().trim()
    };

    // send an AJAX POST-request with jQuery
    $.post("/api/students", newStudent)
      // on success, run this callback
      .done(function (data) {
        alert("Adding student...");
      });

    // empty each input box by replacing the value with an empty string
    $("#first-name").val("");
    $("#last-name").val("");
    $("#email").val("");
    location.href = "/class";
  });

// Whenever someone clicks a student
// $(document).on("click", ".selected-student", function () {
//   var thisId = $(this).attr("id");
//   console.log(thisId);
// });
});