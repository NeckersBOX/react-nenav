'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _nenavStyles = require('./nenav-styles');

var initState = {
  path: '/',
  style: _nenavStyles.foundationStyle,
  data: { data: {} },
  data_sort: {
    attr: 'type',
    type: 'asc'
  },
  dataFunc: console.log
};

var getSplittedPath = function getSplittedPath(path) {
  return path.split('/').map(function (val, idx) {
    if (idx == 0 && val == '') return 'root';

    return val;
  }).filter(function (val) {
    return val != '';
  });
};

var validatePath = function validatePath(state) {
  try {
    var splittedPath = getSplittedPath(state.path);
    var verifiedPath = state.data;
    var analyzedPath = '';

    for (var idx in splittedPath) {
      if (splittedPath[idx] == 'root' && idx == 0) {
        if ('data' in state.data) {
          analyzedPath = '/';
          continue;
        } else throw new Error('Root dir not found');
      }

      if (splittedPath[idx] in verifiedPath.data) {
        verifiedPath = verifiedPath.data[splittedPath[idx]];
        analyzedPath += splittedPath[idx];
      } else throw new Error('Invalid folder: `' + splittedPath[idx] + '` in path: `' + analyzedPath + '`');
    }
  } catch (e) {
    console.error('React-Nenav: pathExist (): ' + e.message);
  }
};

var reducer = function reducer(state, action) {
  if (state === undefined) state = initState;

  switch (action.type) {
    case 'SET_PATH':
      return _extends({}, state, { path: action.path });
    case 'SET_STYLE':
      var currStyle = action.style;
      switch (action.style) {
        case 'foundation':
          currStyle = _nenavStyles.foundationStyle;break;
        case 'bootstrap':
          currStyle = _nenavStyles.bootstrapStyle;break;
      }

      return _extends({}, state, { style: currStyle });
    case 'SET_DATA':
      return _extends({}, state, { data: action.data });
    case 'SET_DATA_FUNC':
      return _extends({}, state, { dataFunc: action.dataFunc });
    case 'SET_SORT':
      return _extends({}, state, { data_sort: action.data_sort });
    case 'VALIDATE_PATH':
      validatePath(state);
      break;
    case 'NEXT_DIR':
      return _extends({}, state, { path: state.path + '/' + action.dir });
    case 'PREV_DIR':
      return _extends({}, state, {
        path: state.path.split('/').slice(0, action.index + 1).join('/')
      });
    case 'CHANGE_DATA_SORT':
      return _extends({}, state, {
        data_sort: {
          attr: action.data_attr,
          type: action.data_type ? action.data_type : state.data_sort.type == 'asc' ? 'desc' : 'asc'
        }
      });
  }

  return state;
};

exports.reducer = reducer;
var getDataList = function getDataList(state, path) {
  var enterPath = state.data;

  for (var idx in path) {
    if (path[idx] == 'root' && idx == 0) continue;

    enterPath = enterPath.data[path[idx]];
  }

  return Object.keys(enterPath.data).map(function (file, idx) {
    return _extends({}, {
      name: file,
      type: enterPath.data[file].type,
      size: enterPath.data[file].size ? enterPath.data[file].size : 0,
      date: enterPath.data[file].date
    });
  }).sort(function (a, b) {
    var val = state.data_sort.type == 'asc' ? 1 : -1;

    if (a.type == 'dir' && state.data_sort.attr != 'type') {
      if (b.type == 'dir' && state.data_sort.attr != 'name') return (a.name < b.name ? -1 : 1) * val;else return -1;
    }

    if (a[state.data_sort.attr] < b[state.data_sort.attr]) return -1 * val;
    if (a[state.data_sort.attr] > b[state.data_sort.attr]) return +1 * val;

    return 0;
  });
};

var mapStateToProps = function mapStateToProps(state) {
  var splittedPath = getSplittedPath(state.path);

  return {
    path: splittedPath,
    style: state.style,
    data: getDataList(state, splittedPath),
    data_sort: state.data_sort,
    dataFunc: state.dataFunc
  };
};

exports.mapStateToProps = mapStateToProps;
var mapStyleToProps = function mapStyleToProps(state) {
  return { style: state.style };
};
exports.mapStyleToProps = mapStyleToProps;