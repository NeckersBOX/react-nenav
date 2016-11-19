import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from './nenav-store';

const NavigationBarComponent = React.createClass ({
  render () {
		let currPathBar = [].map ((folder, idx) => {
			if ( folder == '' && idx == 0 ) folder = 'root';

			return (
				<button key={idx} className={this.props.style.navbar.btn}>
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
