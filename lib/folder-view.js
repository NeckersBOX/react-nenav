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

      return _react2['default'].createElement(_folderViewComponent.File, _extends({ key: idx }, file, { style: _this.props.style,
        humanSize: _this.humanSize, dataFunc: _this.props.dataFunc,
        path: '/' + _this.props.path.slice(1).join('/') + '/' }));
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
            _react2['default'].createElement(
              'a',
              { className: this.props.style.link, onClick: function () {
                  return _this.props.dispatch({ type: 'CHANGE_DATA_SORT', data_attr: 'name' });
                } },
              'Name ',
              _react2['default'].createElement('i', { className: this.getIcon('name') })
            )
          ),
          _react2['default'].createElement(
            'th',
            { className: this.props.style.folder_view.type },
            _react2['default'].createElement(
              'a',
              { className: this.props.style.link, onClick: function () {
                  return _this.props.dispatch({ type: 'CHANGE_DATA_SORT', data_attr: 'type' });
                } },
              'Type ',
              _react2['default'].createElement('i', { className: this.getIcon('type') })
            )
          ),
          _react2['default'].createElement(
            'th',
            { className: this.props.style.folder_view.size },
            _react2['default'].createElement(
              'a',
              { className: this.props.style.link, onClick: function () {
                  return _this.props.dispatch({ type: 'CHANGE_DATA_SORT', data_attr: 'size' });
                } },
              'Size ',
              _react2['default'].createElement('i', { className: this.getIcon('size') })
            )
          ),
          _react2['default'].createElement(
            'th',
            { className: this.props.style.folder_view.date },
            _react2['default'].createElement(
              'a',
              { className: this.props.style.link, onClick: function () {
                  return _this.props.dispatch({ type: 'CHANGE_DATA_SORT', data_attr: 'date' });
                } },
              'Date ',
              _react2['default'].createElement('i', { className: this.getIcon('date') })
            )
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
            this.props.data.filter(function (val) {
              return val.type != 'dir';
            }).length,
            ' Files',
            ', ' + this.props.data.filter(function (val) {
              return val.type == 'dir';
            }).length,
            ' Directories',
            ' - ' + this.humanSize(this.props.data.reduce(function (prev_size, curr_file) {
              if (curr_file.type == 'dir') return prev_size;
              return prev_size + parseInt(curr_file.size);
            }, 0))
          )
        )
      )
    );
  },
  humanSize: function humanSize(byte_size) {
    var units = ['KB', 'MB', 'GB', 'TB'];

    if (byte_size < 512) return byte_size + ' B';

    var units_idx = -1;

    do {
      byte_size /= 1024;
      units_idx++;
    } while (byte_size > 1024);

    return byte_size.toFixed(2) + ' ' + units[units_idx];
  },
  getIcon: function getIcon(attr) {
    if (attr != this.props.data_sort.attr) return '';

    if (this.props.data_sort.type == 'asc') return this.props.style.icon.arrow_down;

    return this.props.style.icon.arrow_up;
  }
});

var FolderView = (0, _reactRedux.connect)(_nenavStore.mapStateToProps)(FolderViewComponent);

exports['default'] = FolderView;
module.exports = exports['default'];