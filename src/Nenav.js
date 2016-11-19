import { createStore } from 'redux';
import { reducer, mapStateToProps } from './nenav-store';
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

const NenavView = connect (mapStateToProps)(NenavViewComponent);

const Nenav = React.createClass ({
	componentDidMount () {
		if ( 'data' in this.props )
			store.dispatch ({ type: 'SET_DATA', data: this.props.data });

		if ( 'path' in this.props ) {
			store.dispatch ({ type: 'SET_PATH', path: this.props.data.path });
			store.dispatch ({ type: 'VALIDATE_PATH' });
		}

		if ( 'style' in this.props )
			store.dispatch ({ type: 'SET_STYLE', style: this.props.style });

		if ( 'sort' in this.props )
			store.dispatch ({ type: 'SET_SORT', style: this.props.sort });
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
