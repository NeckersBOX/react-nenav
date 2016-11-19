import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from './nenav-store';

const NavigationBarComponent = React.createClass ({
  render () {
		let currPathBar = this.props.path.map ((folder, idx) => {
			return (
				<button key={idx} onClick={() => this.props.dispatch (
          { type: 'PREV_DIR', index: idx }
        )} className={this.props.style.navbar.btn}>
					{folder}
				</button>
			);
		});

    return (
      <div className={this.props.style.navbar.area}>
        <div className={this.props.style.navbar.btn_group}>
          {currPathBar}
        </div>
      </div>
    );
  }
});

const NavigationBar = connect (mapStateToProps)(NavigationBarComponent);

export default NavigationBar;
