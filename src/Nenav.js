import React from 'react';

const foundation = {
	main_area: "small-12",
	path_area: "small-12",
	path_btn: "primary button",
	path_btn_group: "small expanded button-group"
};

const bootstrap = {
	main_area: "col-xs-12",
	path_area: "col-xs-12",
	path_btn: "btn btn-primary",
	path_btn_group: "btn-group btn-group-sm btn-group-justified"
};

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

		let __style = foundation;
		if ( 'style' in this.props ) {
			switch (this.props.style) {
				case 'foundation': __style = foundation; break;
				case 'bootstrap': __style = bootstrap; break;
				default: __style = this.props.style; break;
			}
		}

		return { currPath: __currPath, currPathData: __currPathData, style: __style	};
	},
	render () {
		let currPathBar = this.state.currPath.split ('/').map ((folder, idx) => {
			if ( folder == '' && idx == 0 ) folder = 'root';

			return (
				<button key={idx} className={this.state.style.path_btn}>
					{folder}
				</button>
			);
		});

		return (
			<div className={this.state.style.main_area}>
				<div className={this.state.style.path_area}>
					<div className={this.state.style.path_btn_group}>
						{currPathBar}
					</div>
				</div>
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
	}
});

export default Nenav;
