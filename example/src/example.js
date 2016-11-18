var React = require('react');
var ReactDOM = require('react-dom');
var Nenav = require('react-nenav');

const path_data = {
	data: {
		'src': {
			type: 'dir',
			data: {
				'lib': {
					type: 'dir',
					data: {
						'useless.js': { type: 'file', size: '15000', date: '2015-01-04' }
					}
				},
				'index.html': {	type: 'file', size: '15000', date: '2016-05-10' },
				'docs.html': { type: 'file', size: '20000', date: '2016-06-10' },
				'contact.html': { type: 'file', size: '10000', date: '2016-05-10' }
			}
		},
		'Makefile': { type: 'file', size: '5000', date: '2016-01-09' },
		'README.md': { type: 'file', size: '30000', date: '2016-04-10' },
		'LICENSE': { type: 'file', size: '25000', date: '2016-01-09' }
	}
};

const nenav_conf = {
	currPath: '/src',
	orderAttr: 'type',
	orderType: 'asc',
	style: 'foundation'
};

var App = React.createClass({
	render () {
		return (
			<div>
				<Nenav data={path_data} {...nenav_conf} />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
