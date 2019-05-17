import React, { Component } from 'react';
import Tile from '../Board/Tile';

class TileContainer extends Component {

	render() {
		const board = this.props.board;

		let tiles = [];

		for (let row = 0; row < 4; ++row) {
			for (let column = 0; column < 4; ++column) {
				let keymark = column + '-' + row;
				const tile = board[row][column];
				if (tile.value > 0) {
					tiles.push(<Tile tile={tile} key={keymark} />);
				}
			}
		}

		return (
			<div>{tiles}</div>
		);
	}

}

export default TileContainer;