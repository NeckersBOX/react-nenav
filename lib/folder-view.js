'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var FolderView = _react2['default'].createClass({
  displayName: 'FolderView',

  getInitialState: function getInitialState() {
    return {
      currPathData: this.orderData('type', 'asc', this.props.currPathData)
    };
  },
  render: function render() {
    console.log(this.state.currPathData);

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
      _react2['default'].createElement('tbody', null),
      _react2['default'].createElement('tfoot', null)
    );
  },
  orderData: function orderData(attr, sort_type, data) {
    {/* TODO */}
    return data.map(function (val) {
      return val;
    });
  }
});

exports['default'] = FolderView;
module.exports = exports['default'];