import React from 'react';
import NavigationBar from './navigation-bar';
import FolderView from './folder-view';
import { foundationStyle, bootstrapStyle } from './nenav-styles';

const Nenav = React.createClass ({
	getInitialState () {
		if ( this.props.data == null ) {
			console.error ('React-Nenav: Error: this.props.data cannot be null');
			youDontWantToSeeWhatHappenAfterThis ();
		}

		let __currPath = '/';
		let __currPathData = this.props.data;

		if ( 'currPath' in this.props ) {
			__currPathData = this.pathExist (this.props.currPath);
			__currPath = this.props.currPath;
		}
		else __currPathData = this.props.data.data;

		let __style = foundationStyle;
		if ( 'style' in this.props ) {
			switch (this.props.style) {
				case 'foundation': __style = foundationStyle; break;
				case 'bootstrap': __style = bootstrapStyle; break;
				default: __style = this.props.style; break;
			}
		}

		let __orderType = null;
		if ( 'orderType' in this.props )
			   __orderType = this.props.orderType;

		let __orderAttr = null;
		if ( 'orderAttr' in this.props )
			   __orderAttr = this.props.orderAttr;

		return {
			currPath: __currPath,
			currPathData: __currPathData,
			style: __style,
			orderAttr: __orderAttr,
			orderType: __orderType
		};
	},
	render () {
		return (
			<div className={this.state.style.main_area}>
				<NavigationBar style={this.state.style} currPath={this.state.currPath} />
				<FolderView
					nextPath={this.nextPath}
					style={this.state.style}
					currPathData={this.state.currPathData}
				 	orderType={this.state.orderType}
					orderAttr={this.state.orderAttr} />
			</div>
		);
	},
	pathExist (path) {
		try {
			let splittedPath = path.split ('/');
			let verifiedPath = this.props.data;
			let analyzedPath = '';

			for ( let idx in splittedPath ) {
				if ( splittedPath[idx] == '' && idx == 0 ) {
					if ( 'data' in this.props.data ) {
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
	},
	nextPath (path) {
		this.setState ({
			currPath: this.state.currPath + '/' + path,
			currPathData: this.state.currPathData.data[path]
		});
	}
});

export default Nenav;
