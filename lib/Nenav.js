'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _redux = require('redux');

var _nenavStore = require('./nenav-store');

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _navigationBar = require('./navigation-bar');

var _navigationBar2 = _interopRequireDefault(_navigationBar);

var _folderView = require('./folder-view');

var _folderView2 = _interopRequireDefault(_folderView);

var store = (0, _redux.createStore)(_nenavStore.reducer);

var NenavViewComponent = _react2['default'].createClass({
	displayName: 'NenavViewComponent',

	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: this.props.style.main_area },
			_react2['default'].createElement(_navigationBar2['default'], null),
			_react2['default'].createElement(_folderView2['default'], null)
		);
	}
});

var NenavView = (0, _reactRedux.connect)(_nenavStore.mapStyleToProps)(NenavViewComponent);

var Nenav = _react2['default'].createClass({
	displayName: 'Nenav',

	componentDidMount: function componentDidMount() {
		if ('data' in this.props) store.dispatch({ type: 'SET_DATA', data: this.props.data });

		if ('path' in this.props) {
			store.dispatch({ type: 'SET_PATH', path: this.props.path });
			store.dispatch({ type: 'VALIDATE_PATH' });
		}

		if ('style' in this.props) store.dispatch({ type: 'SET_STYLE', style: this.props.style });

		if ('data_sort' in this.props) store.dispatch({ type: 'SET_SORT', data_sort: this.props.data_sort });
	},
	render: function render() {
		return _react2['default'].createElement(
			_reactRedux.Provider,
			{ store: store },
			_react2['default'].createElement(NenavView, null)
		);
	}
});

exports['default'] = Nenav;
module.exports = exports['default'];