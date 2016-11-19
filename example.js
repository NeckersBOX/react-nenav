require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Nenav = require('react-nenav');

var path_data = {
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
				'index.html': { type: 'file', size: '15000', date: '2016-05-10' },
				'docs.html': { type: 'file', size: '20000', date: '2016-06-10' },
				'contact.html': { type: 'file', size: '10000', date: '2016-05-10' }
			}
		},
		'Makefile': { type: 'file', size: '5000', date: '2016-01-09' },
		'README.md': { type: 'file', size: '30000', date: '2016-04-10' },
		'LICENSE': { type: 'file', size: '25000', date: '2016-01-09' }
	}
};

var getFileData = function getFileData(file_path, resultFunc) {
	setTimeout(function () {
		resultFunc('<h1>File `' + file_path + '` Example</h1>');
	}, 500);
};

var nenav_conf = {
	path: '/src',
	data: path_data,
	data_sort: { attr: 'name', type: 'asc' },
	dataFunc: getFileData,
	style: 'foundation'
};

var App = React.createClass({
	displayName: 'App',

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(Nenav, nenav_conf)
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-nenav":undefined}]},{},[1]);