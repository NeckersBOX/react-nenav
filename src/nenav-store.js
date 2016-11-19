import { foundationStyle, bootstrapStyle } from './nenav-styles';

const initState = {
  path: '/',
  style: foundationStyle,
  data: { data: {} },
  data_sort: {
    attr: 'type',
    type: 'asc'
  }
};

const validatePath = (state) => {
	try {
		let splittedPath = state.path.split ('/');
		let verifiedPath = state.data;
		let analyzedPath = '';

		for ( let idx in splittedPath ) {
			if ( splittedPath[idx] == '' && idx == 0 ) {
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

		return verifiedPath;
	}
	catch (e) {
		console.error ('React-Nenav: Error: pathExist (): ' + e.message);
		youDontWantToSeeWhatHappenAfterThis ();
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
    case 'SET_SORT':
      return Object.assign ({}, state, { sort: action.sort });
    case 'VALIDATE_PATH':
      validatePath (state);
      break;
  }

  return state;
};

const getDataList = (data, sort) => {
  return Object.keys (data).map ((file, idx) =>
    Object.assign ({}, {
      name: file,
      type: data[file].type,
      size: data[file].size,
      date: data[file].date
    })
  );
};

export const mapStateToProps = (state) => {
  return {
    path: state.path.split ('/').map ((val, idx) => {
      if ( idx == 0 && val == '' )
        return 'root';

      return val;
    }),
    style: state.style,
    data: getDataList (state.data, state.sort)
  }
};
