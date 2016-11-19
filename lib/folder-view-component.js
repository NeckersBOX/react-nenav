'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var File = _react2['default'].createClass({
  displayName: 'File',

  getInitialState: function getInitialState() {
    return {
      name: this.props.name,
      size: this.props.size,
      type: this.props.type,
      date: this.props.date
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps() {
    this.setState({
      name: this.props.name,
      size: this.props.size,
      type: this.props.type,
      date: this.props.date
    });
  },
  render: function render() {
    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        { className: this.props.style.folder_view.name },
        _react2['default'].createElement('i', { className: this.props.style.folder_view.file }),
        ' ' + this.state.name
      ),
      _react2['default'].createElement(
        'td',
        { className: this.props.style.folder_view.type },
        this.state.type == 'dir' ? 'DIR' : ''
      ),
      _react2['default'].createElement(
        'td',
        { className: this.props.style.folder_view.size },
        this.state.size
      ),
      _react2['default'].createElement(
        'td',
        { className: this.props.style.folder_view.date },
        this.state.date
      )
    );
  }
});

exports.File = File;
var Folder = _react2['default'].createClass({
  displayName: 'Folder',

  getInitialState: function getInitialState() {
    return { name: this.props.name };
  },
  componentWillReceiveProps: function componentWillReceiveProps() {
    this.setState({ name: this.props.name });
  },
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
              return _this.props.onClick(_this.props.name);
            } },
          _react2['default'].createElement('i', { className: this.props.style.folder_view.folder }),
          ' ' + this.state.name
        )
      ),
      _react2['default'].createElement(
        'td',
        { className: this.props.style.folder_view.type },
        'Folder'
      ),
      _react2['default'].createElement('td', { className: this.props.style.folder_view.size }),
      _react2['default'].createElement('td', { className: this.props.style.folder_view.date })
    );
  }
});
exports.Folder = Folder;