import React from 'react';

const NavigationBar = React.createClass ({
  getInitialState () {
    return { currPathElements: this.props.currPath.split ('/') };
  },
  render () {
		let currPathBar = this.state.currPathElements.map ((folder, idx) => {
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

export default NavigationBar;
