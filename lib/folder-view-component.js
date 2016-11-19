'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var File = _react2['default'].createClass({
  displayName: 'File',

  render: function render() {
    var _this = this;

    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        { className: this.props.style.folder_view.name },
        _react2['default'].createElement(
          'a',
          { className: this.props.style.link,
            onClick: function () {
              return _this.props.dataFunc(_this.props.path + _this.props.name);
            } },
          _react2['default'].createElement('i', { className: this.props.style.icon.file }),
          ' ' + this.props.name
        )
      ),
      _react2['default'].createElement(
        'td',
        { className: this.props.style.folder_view.type },
        'File'
      ),
      _react2['default'].createElement(
        'td',
        { className: this.props.style.folder_view.size },
        this.props.humanSize(this.props.size)
      ),
      _react2['default'].createElement(
        'td',
        { className: this.props.style.folder_view.date },
        this.props.date
      )
    );
  }
});

exports.File = File;
var Folder = _react2['default'].createClass({
  displayName: 'Folder',

  render: function render() {
    var _this2 = this;

    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        { className: this.props.style.folder_view.name },
        _react2['default'].createElement(
          'a',
          { className: this.props.style.link,
            onClick: function () {
              return _this2.props.onClick(_this2.props.name);
            } },
          _react2['default'].createElement('i', { className: this.props.style.icon.folder }),
          ' ' + this.props.name
        )
      ),
      _react2['default'].createElement(
        'td',
        { className: this.props.style.folder_view.type },
        'Directory'
      ),
      _react2['default'].createElement('td', { className: this.props.style.folder_view.size }),
      _react2['default'].createElement('td', { className: this.props.style.folder_view.date })
    );
  }
});
exports.Folder = Folder;