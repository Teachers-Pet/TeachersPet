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
                    <li
                      key={i}
                      className="collection-item avatar"
                    >
                      <a
                        key={`${students.name + i}`}
                        id={students.id}
                        className = "listed-student"
                      >
                        <img src={students.imgUrl} alt="" className="circle" />
                        <p key={students.name} className="name">
                          {students.name}
                        </p>
                      </a>
                    </li>
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