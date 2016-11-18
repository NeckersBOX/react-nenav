'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

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