import { createStore } from 'redux';
import { reducer, mapStyleToProps } from './nenav-store';
import { connect, Provider } from 'react-redux';

import React from 'react';
import NavigationBar from './navigation-bar';
import FolderView from './folder-view';

let store = createStore (reducer);

const NenavViewComponent = React.createClass ({
	render () {
		return (
			<div className={this.props.style.main_area}>
				<NavigationBar />
				<FolderView />
			</div>
		);
	}
});

const NenavView = connect (mapStyleToProps)(NenavViewComponent);

const Nenav = React.createClass ({
	componentDidMount () {
		if ( 'data' in this.props )
			store.dispatch ({ type: 'SET_DATA', data: this.props.data });

		if ( 'path' in this.props ) {
			store.dispatch ({ type: 'SET_PATH', path: this.props.path });
			store.dispatch ({ type: 'VALIDATE_PATH' });
		}

		if ( 'style' in this.props )
			store.dispatch ({ type: 'SET_STYLE', style: this.props.style });

		if ( 'data_sort' in this.props )
			store.dispatch ({ type: 'SET_SORT', data_sort: this.props.data_sort });

		if ( 'dataFunc' in this.props )
			store.dispatch ({ type: 'SET_DATA_FUNC', dataFunc: this.props.dataFunc });
	},
	render () {
		return (
			<Provider store={store}>
				<NenavView />
			</Provider>
		);
	}
});

export default Nenav;
