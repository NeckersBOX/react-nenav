(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Nenav = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./folder-view":2,"./navigation-bar":3,"./nenav-styles":4}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var FolderView = _react2['default'].createClass({
  displayName: 'FolderView',

  getInitialState: function getInitialState() {
    var _this = this;

    var orderAttr = 'type';
    if ('orderAttr' in this.props) orderAttr = this.props.orderAttr;

    var orderType = 'asc';
    if ('orderType' in this.props) orderType = this.props.orderType;

    var __currPathData = this.orderData(orderAttr, orderType, Object.keys(this.props.currPathData.data).map(function (file, idx) {
      return _extends({ name: file }, _this.props.currPathData.data[file]);
    }));

    return {
      currPathData: __currPathData,
      filesSize: __currPathData.reduce(function (prev, curr) {
        return curr.type == 'dir' ? prev : prev + parseInt(curr.size);
      }, 0)
    };
  },
  render: function render() {
    var _this2 = this;

    var files = this.state.currPathData.map(function (file, idx) {
      if (file.type == 'dir') return _react2['default'].createElement(
        'tr',
        { key: idx },
        _react2['default'].createElement(
          'td',
          { className: _this2.props.style.folder_view.name },
          file.name
        ),
        _react2['default'].createElement(
          'td',
          { className: _this2.props.style.folder_view.type },
          file.type
        ),
        _react2['default'].createElement('td', { className: _this2.props.style.folder_view.size }),
        _react2['default'].createElement('td', { className: _this2.props.style.folder_view.date })
      );

      return _react2['default'].createElement(
        'tr',
        { key: idx },
        _react2['default'].createElement(
          'td',
          { className: _this2.props.style.folder_view.name },
          file.name
        ),
        _react2['default'].createElement(
          'td',
          { className: _this2.props.style.folder_view.type },
          file.type
        ),
        _react2['default'].createElement(
          'td',
          { className: _this2.props.style.folder_view.size },
          file.size
        ),
        _react2['default'].createElement(
          'td',
          { className: _this2.props.style.folder_view.date },
          file.date
        )
      );
    });

    return _react2['default'].createElement(
      'table',
      { className: this.props.style.folder_view.table },
      _react2['default'].createElement(
        'thead',
        null,
        _react2['default'].createElement(
          'tr',
          null,
          _react2['default'].createElement(
            'th',
            { className: this.props.style.folder_view.name },
            'Name'
          ),
          _react2['default'].createElement(
            'th',
            { className: this.props.style.folder_view.type },
            'Type'
          ),
          _react2['default'].createElement(
            'th',
            { className: this.props.style.folder_view.size },
            'Size'
          ),
          _react2['default'].createElement(
            'th',
            { className: this.props.style.folder_view.date },
            'Date'
          )
        )
      ),
      _react2['default'].createElement(
        'tbody',
        null,
        files
      ),
      _react2['default'].createElement(
        'tfoot',
        null,
        _react2['default'].createElement(
          'tr',
          null,
          _react2['default'].createElement(
            'td',
            { colSpan: '4' },
            _react2['default'].createElement(
              'strong',
              null,
              'File:'
            ),
            this.state.currPathData.length,
            ' - ',
            _react2['default'].createElement(
              'strong',
              null,
              'Size:'
            ),
            this.state.filesSize
          )
        )
      )
    );
  },
  orderData: function orderData(attr, sort_type, data) {
    return data.sort(function (a, b) {
      var val = sort_type == 'asc' ? 1 : -1;

      if (a[attr] < b[attr]) return -1 * val;
      if (a[attr] > b[attr]) return +1 * val;

      return 0;
    });
  }
});

exports['default'] = FolderView;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var NavigationBar = _react2['default'].createClass({
  displayName: 'NavigationBar',

  getInitialState: function getInitialState() {
    return { currPathElements: this.props.currPath.split('/') };
  },
  render: function render() {
    var _this = this;

    var currPathBar = this.state.currPathElements.map(function (folder, idx) {
      if (folder == '' && idx == 0) folder = 'root';

      return _react2['default'].createElement(
        'button',
        { key: idx, className: _this.props.style.navbar.btn },
        folder
      );
    });

    return _react2['default'].createElement(
      'div',
      { className: this.props.style.navbar.area },
      _react2['default'].createElement(
        'div',
        { className: this.props.style.navbar.btn_group },
        currPathBar
      )
    );
  }
});

exports['default'] = NavigationBar;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var foundationStyle = {
	main_area: "small-12",
	navbar: {
		area: "small-12",
		btn: "primary button",
		btn_group: "small expanded button-group"
	},
	folder_view: {
		table: "table-scroll hover",
		name: 'text-left',
		type: 'text-right',
		size: 'text-right',
		date: 'text-center'
	}
};

exports.foundationStyle = foundationStyle;
var bootstrapStyle = {
	main_area: "col-xs-12",
	navbar: {
		area: "col-xs-12",
		btn: "btn btn-primary",
		btn_group: "btn-group btn-group-sm btn-group-justified"
	}
};
exports.bootstrapStyle = bootstrapStyle;

},{}]},{},[1])(1)
});