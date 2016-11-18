"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var foundation = {
	main_area: "small-12",
	path_area: "small-12",
	path_btn: "primary button",
	path_btn_group: "small expanded button-group"
};

var bootstrap = {
	main_area: "col-xs-12",
	path_area: "col-xs-12",
	path_btn: "btn btn-primary",
	path_btn_group: "btn-group btn-group-sm btn-group-justified"
};

var Nenav = _react2["default"].createClass({
	displayName: "Nenav",

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

		var __style = foundation;
		if ('style' in this.props) {
			switch (this.props.style) {
				case 'foundation':
					__style = foundation;break;
				case 'bootstrap':
					__style = bootstrap;break;
				default:
					__style = this.props.style;break;
			}
		}

		return { currPath: __currPath, currPathData: __currPathData, style: __style };
	},
	render: function render() {
		var _this = this;

		var currPathBar = this.state.currPath.split('/').map(function (folder, idx) {
			if (folder == '' && idx == 0) folder = 'root';

			return _react2["default"].createElement(
				"button",
				{ key: idx, className: _this.state.style.path_btn },
				folder
			);
		});

		return _react2["default"].createElement(
			"div",
			{ className: this.state.style.main_area },
			_react2["default"].createElement(
				"div",
				{ className: this.state.style.path_area },
				_react2["default"].createElement(
					"div",
					{ className: this.state.style.path_btn_group },
					currPathBar
				)
			)
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

exports["default"] = Nenav;
module.exports = exports["default"];