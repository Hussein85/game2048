import React, { Component } from 'react';
import './GridContainer.css';

class GridContainer extends Component {

	render() {

		return (
			<div className="grid-container">
				<div className="grid-row">
					<div className="grid-tile"></div>
					<div className="grid-tile"></div>
					<div className="grid-tile"></div>
					<div className="grid-tile"></div>
				</div>
				<div className="grid-row">
					<div className="grid-tile"></div>
					<div className="grid-tile"></div>
					<div className="grid-tile"></div>
					<div className="grid-tile"></div>
				</div>
				<div className="grid-row">
					<div className="grid-tile"></div>
					<div className="grid-tile"></div>
					<div className="grid-tile"></div>
					<div className="grid-tile"></div>
				</div>
				<div className="grid-row">
					<div className="grid-tile"></div>
					<div className="grid-tile"></div>
					<div className="grid-tile"></div>
					<div className="grid-tile" ></div>
				</div>
			</div >
		);
	}

}

export default GridContainer;