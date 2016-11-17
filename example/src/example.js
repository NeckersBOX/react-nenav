var React = require('react');
var ReactDOM = require('react-dom');
var Nenav = require('react-nenav');

var App = React.createClass({
	render () {
		return (
			<div>
				<Nenav />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
