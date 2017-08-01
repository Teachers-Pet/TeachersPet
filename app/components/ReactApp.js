var React = require("react");
var helpers = require("./utils/helpers");

var ReactApp = React.createFactory(
  React.createClass({
    getInitialState: function() {
      return {
        students: []
      };
    },
    componentDidMount: function() {
      helpers.getStudents().then(
        function(students) {
          console.log(students);
          this.setState({
            students: students.data
          });
        }.bind(this)
      );
    },
    render: function() {
      return (
        <div className="row">
          <div className="col s12 student-list-pnl">
            <div className="card-panel white">
              <ul className="collection">
                {this.state.students.map((students, i) => {
                  return (
                    <a href="#student-summary-modal" id={students.id} key={i} className="collection-item name listed-student">
                <span className="showId">{students.id}</span> | <span className="showStudentName">{students.name}</span>
              </a>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>


      );
    }
  })
);

module.exports.ReactApp = ReactApp;