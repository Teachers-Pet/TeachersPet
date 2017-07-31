$(document).ready(function() {
  // initialize modals
  $(".modal").modal();
  $("select").material_select();
  // show already saved assignments on the page
  function listDisplay(data) {
    var divRow;
    var divCol1;
    var divCol2;
    var icon;
    var listItem;

    for (var i = 0; i < data.length; i++) {
      divRow = $("<div class='row'>");
      divCol1 = $("<div class='col s6'>");
      divCol2 = $("<div class='col s6'>");
      icon = $("<i class='right tiny material-icons'>assignment_turned_in</i>");
      listItem = $("<li>");

      divCol1.text(data[i].assignName);
      divCol2.append(icon);
      divRow.append(divCol1, divCol2);
      listItem.append(divRow);

      $("#allAssignments").append(listItem);
    }
  }
  // get and display assignments from the database
  $.get("/api/assignments", listDisplay);

  // Submits new assignment to the database
  function saveAssignment(assignment) {
    $.post("/api/assignments", assignment, function() {});
    location.href = "/assignments";
  }

  $("#save-assignment").on("click", function(event) {
    event.preventDefault();
    var name = $("#assignment-name").val().trim();
    // checks to make sure form fields are not empty
    if (!name) {
      $(".alertUser").text("Please enter an assignment name.");
      return;
    }
    //Create a new object to go into the database
    var newAssignment = {
      assignName: name
    };
    saveAssignment(newAssignment);
  });
});
