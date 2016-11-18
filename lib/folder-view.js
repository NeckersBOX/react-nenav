'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

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