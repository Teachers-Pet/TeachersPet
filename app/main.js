var ReactDOM = require('react-dom');

var ReactApp = require('./components/ReactApp').ReactApp;

var mountNode = document.getElementById('main-mount');

ReactDOM.render(new ReactApp({}), mountNode);
