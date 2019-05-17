import React, { Component } from 'react';
import './Tile.css';


// Constants
const TILE_SPACE = 5;
const TILE_SIDE_LENGTH = 100;

class Tile extends Component {

	setTilePos(pos) {
		const targetPos = TILE_SPACE + pos * (TILE_SPACE * 2 + TILE_SIDE_LENGTH);

		return targetPos;
	}

	setTileClass() {
		const tile = this.props.tile;
		const classArray = ['tile'];
		const tileValue = tile.value;

		classArray.push('tile-color-' + tileValue);

		if (tile.isMerged) {
			classArray.push('tile-merged')
		}

		if (tile.isNew) {
      classArray.push('tile-new')
    }

		return classArray.join(' ');
	}

	render() {
		const tile = this.props.tile;

		const tileStyle = {
			top: this.setTilePos(tile.row),
			left: this.setTilePos(tile.column)
		};

		return (
			<div className={this.setTileClass()} style={tileStyle}>{tile.value}</div>
		);
	}

}

export default Tile;