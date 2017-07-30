<<<<<<< HEAD
var React = require("react");
var helpers = require("./utils/helpers");
=======
var React = require('react');
var helpers = require('./utils/helpers');
>>>>>>> b55caaabbc318d7aa773a6098845c4c9e09da578

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
<<<<<<< HEAD
        <div>
          <div className="row">
            <div className="col s12 student-list-pnl">
              <div className="card-panel white">
                <ul className="collection">
                  {this.state.students.map((students, i) => {
                    return (
                      <li
                        id={students.name}
                        key={i}
                        className="collection-item avatar"
                      >
                        <a key={`${students.name + i}`}>
                          <img
                            src={students.imgUrl}
                            alt=""
                            className="circle"
                          />
                          <p key={students.firstName} className="name">
                            {students.name}
                          </p>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
=======
        <div className="row">
          <div className="col s12 student-list-pnl">
            <div className="card-panel white">
              <ul className="collection">
                {this.state.students.map((students, i) => {
                  return (
                    <li id={students.name} key={i} className="collection-item avatar">
                      <a key={`${students.name + i}`}>
                        <img src={students.imgUrl} alt="" className="circle" />
                        <p key={students.name} className="name">
                          {students.name}
                        </p>
                      </a>
                    </li>
                  );
                })}
              </ul>
>>>>>>> b55caaabbc318d7aa773a6098845c4c9e09da578
            </div>
          </div>
        </div>
      );
    }
  })
);

module.exports.ReactApp = ReactApp;
