'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _nenavStore = require('./nenav-store');

var NavigationBarComponent = _react2['default'].createClass({
  displayName: 'NavigationBarComponent',

  render: function render() {
    var _this = this;

    var currPathBar = this.props.path.map(function (folder, idx) {
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

var NavigationBar = (0, _reactRedux.connect)(_nenavStore.mapStateToProps)(NavigationBarComponent);

exports['default'] = NavigationBar;
module.exports = exports['default'];