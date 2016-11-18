'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _navigationBar = require('./navigation-bar');

var _navigationBar2 = _interopRequireDefault(_navigationBar);

var _folderView = require('./folder-view');

var _folderView2 = _interopRequireDefault(_folderView);

var _nenavStyles = require('./nenav-styles');

var Nenav = _react2['default'].createClass({
	displayName: 'Nenav',

	getInitialState: function getInitialState() {
		if (this.props.data == null) {
			console.error('React-Nenav: Error: this.props.data cannot be null');
			youDontWantToSeeWhatHappenAfterThis();
		}

		var __currPath = '/';
		var __currPathData = this.props.data;

		if ('currPath' in this.props) {
			__currPathData = this.pathExist(this.props.currPath);
			__currPath = this.props.currPath;
		} else __currPathData = this.props.data.data;

		var __style = _nenavStyles.foundationStyle;
		if ('style' in this.props) {
			switch (this.props.style) {
				case 'foundation':
					__style = _nenavStyles.foundationStyle;break;
				case 'bootstrap':
					__style = _nenavStyles.bootstrapStyle;break;
				default:
					__style = this.props.style;break;
			}
		}

		var __orderType = null;
		if ('orderType' in this.props) __orderType = this.props.orderType;

		var __orderAttr = null;
		if ('orderAttr' in this.props) __orderAttr = this.props.orderAttr;

		return {
			currPath: __currPath,
			currPathData: __currPathData,
			style: __style,
			orderAttr: __orderAttr,
			orderType: __orderType
		};
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: this.state.style.main_area },
			_react2['default'].createElement(_navigationBar2['default'], { style: this.state.style, currPath: this.state.currPath }),
			_react2['default'].createElement(_folderView2['default'], { style: this.state.style, currPathData: this.state.currPathData,
				orderType: this.state.orderType, orderAttr: this.state.orderAttr })
		);
	},
	pathExist: function pathExist(path) {
		try {
			var splittedPath = path.split('/');
			var verifiedPath = this.props.data;
			var analyzedPath = '';

			for (var idx in splittedPath) {
				if (splittedPath[idx] == '' && idx == 0) {
					if ('data' in this.props.data) {
						analyzedPath = '/';
						continue;
					} else throw new Error('Root dir not found');
				}

				if (splittedPath[idx] in verifiedPath.data) {
					verifiedPath = verifiedPath.data[splittedPath[idx]];
					analyzedPath += splittedPath[idx];
				} else throw new Error('Invalid folder: `' + splittedPath[idx] + '` in path: `' + analyzedPath + '`');
			}

			return verifiedPath;
		} catch (e) {
			console.error('React-Nenav: Error: pathExist (): ' + e.message);
			youDontWantToSeeWhatHappenAfterThis();
		}
	}
});

exports['default'] = Nenav;
module.exports = exports['default'];