import { foundationStyle, bootstrapStyle } from './nenav-styles';

const initState = {
  path: '',
  style: foundationStyle,
  data: { data: {} },
  data_sort: {
    attr: 'type',
    type: 'asc'
  },
  dataFunc: console.log,
  list_type: 'dir',
  file_info: null,
  onMount: null
};

const getSplittedPath = (path) => {
  return path.split ('/').map ((val, idx) => {
    if ( idx == 0 && val == '' )
      return 'root';

    return val;
  }).filter ((val) => val != '');
};

const validatePath = (state) => {
	try {
		let splittedPath = getSplittedPath (state.path);
		let verifiedPath = state.data;
		let analyzedPath = '';

		for ( let idx in splittedPath ) {
			if ( splittedPath[idx] == 'root' && idx == 0 ) {
				if ( 'data' in state.data ) {
					analyzedPath = '/';
					continue;
				}
				else throw new Error ('Root dir not found');
			}

		  if ( splittedPath[idx] in verifiedPath.data ) {
		       verifiedPath = verifiedPath.data[splittedPath[idx]];
				   analyzedPath += splittedPath[idx];
		  }
			else throw new Error ('Invalid folder: `' + splittedPath[idx]
														+ '` in path: `' + analyzedPath + '`');
		}
	}
	catch (e) {
		console.error ('React-Nenav: pathExist (): ' + e.message);
	}
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_PATH':
      return Object.assign ({}, state, { path: action.path });
    case 'SET_STYLE':
      let currStyle = action.style;
      switch (action.style) {
        case 'foundation': currStyle = foundationStyle; break;
        case 'bootstrap': currStyle = bootstrapStyle; break;
      }

      return Object.assign ({}, state, { style: currStyle });
    case 'SET_DATA':
      return Object.assign ({}, state, { data: action.data });
    case 'SET_DATA_FUNC':
      return Object.assign ({}, state, { dataFunc: action.dataFunc });
    case 'SET_ONMOUNT':
      return Object.assign ({}, state, { onMount: action.onMount });
    case 'SET_SORT':
      return Object.assign ({}, state, { data_sort: action.data_sort });
    case 'VALIDATE_PATH':
      validatePath (state);
      break;
    case 'NEXT_DIR':
      return Object.assign ({}, state, {
        path: state.path + '/' + action.dir,
        list_type: 'dir',
        file_info: null
      });
    case 'PREV_DIR':
      return Object.assign ({}, state, {
        path: state.path.split ('/').slice (0, action.index + 1).join ('/'),
        list_type: 'dir',
        file_info: null
      });
    case 'CHANGE_DATA_SORT':
      return Object.assign ({}, state, {
        data_sort: {
          attr: action.data_attr,
          type: action.data_type ? action.data_type : (
            ( state.data_sort.type == 'asc' ) ? 'desc' : 'asc'
          )
        }
      });
    case 'SHOW_FILES_LIST':
      return Object.assign ({}, state, { list_type: 'dir' });
    case 'SHOW_FILE_INFO':
      return Object.assign ({}, state, {
        list_type: 'file',
        file_info: action.info
      });
  }

  return state;
};

const getDataList = (state, path) => {
  let enterPath = state.data;

  for ( let idx in path ) {
    if ( path[idx] == 'root' && idx == 0 )
      continue;

    enterPath = enterPath.data[path[idx]];
  }

  return Object.keys (enterPath.data).map ((file, idx) =>
    Object.assign ({}, {
      name: file,
      type: enterPath.data[file].type,
      size: enterPath.data[file].size ? enterPath.data[file].size : 0,
      date: enterPath.data[file].date
    })
  ).sort ((a, b) => {
    let val = (state.data_sort.type == 'asc' ) ? 1 : -1;

    if ( a.type == 'dir' && state.data_sort.attr != 'type' ) {
      if ( b.type == 'dir' && state.data_sort.attr != 'name' )
        return (( a.name < b.name ) ? -1 : 1) * val;
      else return -1;
    }


    if ( a[state.data_sort.attr] < b[state.data_sort.attr] ) return -1 * val;
    if ( a[state.data_sort.attr] > b[state.data_sort.attr] ) return +1 * val;

    return 0;
  });
};

export const mapStateToProps = (state) => {
  let splittedPath = getSplittedPath (state.path);

  return {
    path: splittedPath,
    style: state.style,
    data: getDataList (state, splittedPath),
    data_sort: state.data_sort,
    dataFunc: state.dataFunc,
    list_type: state.list_type,
    file_info: state.file_info,
    onMount: state.onMount
  }
};

export const mapStyleToProps = (state) => {
  return { style: state.style };
};
