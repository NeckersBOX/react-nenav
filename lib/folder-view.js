'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _nenavStore = require('./nenav-store');

var _folderViewComponent = require('./folder-view-component');

var FolderViewComponent = _react2['default'].createClass({
  displayName: 'FolderViewComponent',

  render: function render() {
    var _this = this;

    var files = this.props.data.map(function (file, idx) {
      if (file.type == 'dir') return _react2['default'].createElement(_folderViewComponent.Folder, _extends({ key: idx }, file, { style: _this.props.style,
        onClick: function () {
          return _this.props.dispatch({
            type: 'NEXT_DIR', dir: file.name
          });
        } }));

      return _react2['default'].createElement(_folderViewComponent.File, _extends({ key: idx }, file, { style: _this.props.style }));
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
            'File: ',
            this.props.data.length,
            ' - Size: ',
            this.props.data.reduce(function (prev, curr) {
              return prev + parseInt(curr.size);
            }, 0)
          )
        )
      )
    );
  }
});

var FolderView = (0, _reactRedux.connect)(_nenavStore.mapStateToProps)(FolderViewComponent);

exports['default'] = FolderView;
module.exports = exports['default'];