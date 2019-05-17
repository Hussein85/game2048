import React, { Component } from 'react';
import Heading from '../Heading/Heading';
import GridContainer from '../Board/GridContainer';
import TileContainer from '../Board/TileContainer';
import {initBoard, moveTiles, checkForGameOver, isGameCompleted} from '../../logic/utils';

import './App.css';

//Constants
const HOW_FAR_TO_SWIPE = 30;          // How much we should swipe to detect a move on the touchboard
const DELTAXY_RELATION = 3;           // How big the relation between deltaX and deltaY is when swiping on the touchboard
const LEFT = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			board: initBoard(),
			won: false,
			gameOver: false
		};

		this.handleNewGame = this.handleNewGame.bind(this);
	}

	handleNewGame() {
		this.setState({
			board: initBoard()
		});
		this.setState({
			gameOver: false,
			won: false
		});
	}

	handleKeyDown(event) {
		if (event.keyCode >= 37 && event.keyCode <= 40) {
			const direction = event.keyCode - 37;

			// Game is completed if tile 2048 is reached
			const isWon = isGameCompleted(this.state.board);
			if (isWon) {
				this.setState({
					won: true
				});
				return;
			}

			// It's gameover if no possible moves are left
			const gameover = checkForGameOver(this.state.board);
			if (gameover) {
				this.setState({
					gameOver: true
				});
				return;

			}
			else {
				// Continue playing
				this.setState({
					board:  moveTiles(direction, this.state.board)
				});
			}
		}
	}

	handleTouchStart(event) {
		if (this.state.won) {
			this.setState({
				won: true
			});
			return;
		}
		if (event.touches.length !== 1) {
			return;
		}
		this.startX = event.touches[0].screenX;
		this.startY = event.touches[0].screenY;
	}

	// Calculate difference between end and start touch-position to determine the direction
	handleTouchEnd(event) {
		if (this.state.won) {
			this.setState({
				won: true
			});
			return;
		}
		if (event.changedTouches.length !== 1) {
			return;
		}

		const deltaX = event.changedTouches[0].screenX - this.startX;
		const deltaY = event.changedTouches[0].screenY - this.startY;
		let direction = -1;

		// deltaX should be larger than deltaY since we don't want to detect diagonal moves
		if (Math.abs(deltaX) > DELTAXY_RELATION * Math.abs(deltaY) && Math.abs(deltaX) > HOW_FAR_TO_SWIPE) {
			direction = deltaX > 0 ? RIGHT : LEFT;
		} else if (Math.abs(deltaY) > DELTAXY_RELATION * Math.abs(deltaX) && Math.abs(deltaY) > HOW_FAR_TO_SWIPE) {
			direction = deltaY > 0 ? DOWN : UP;
		}
		if (direction !== -1) {
			this.setState({
				board:  moveTiles(direction, this.state.board)
			});
		}
	}

	componentDidMount() {
		window.addEventListener('keydown', e=>{this.handleKeyDown(e);});
	}

	setGameStatus() {
		if(this.state.gameOver) {
			return  <span className="game-over">GAME OVER. TRY AGAIN!</span>;
		}
		if(this.state.won) {
			return  <span className="game-won">CONGRATULATIONS. YOU WON!</span>;
		}

	}

	render() {
		const board = this.state.board;

		return (
			<div className="container">
				<Heading/>
				<div className="newGame">
					<p className="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>
					<button onClick={this.handleNewGame} className="newGame-button">New Game</button>
					{this.setGameStatus()}
				</div>
				<div className="board-container" onTouchStart={this.handleTouchStart.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)}>
					<GridContainer />
					<TileContainer board={board}/>
				</div>
				<p className="game-explanation">
					<strong className="important">How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles.
				</p>
			</div>
		);
	}
}

export default App;