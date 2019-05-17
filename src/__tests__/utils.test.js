import React from 'react';
import ReactDOM from 'react-dom';
import {initBoard, rotateLeft, setPositions, moveLeft, checkForGameOver, isBoardFull, isGameCompleted} from '../logic/utils';

const testBoard = [
	[{column:0, row:0, value:2},{column:0, row:0, value:2},{column:0, row:0, value:0},{column:0, row:0, value:0}],
	[{column:0, row:0, value:2},{column:0, row:0, value:0},{column:0, row:0, value:0},{column:0, row:0, value:0}],
	[{column:0, row:0, value:0},{column:0, row:0, value:4},{column:0, row:0, value:0},{column:0, row:0, value:0}],
	[{column:0, row:0, value:0},{column:0, row:0, value:0},{column:0, row:0, value:0},{column:0, row:0, value:0}]
];

const testGameOverBoard = [
	[{column:0, row:0, value:4},{column:0, row:0, value:2},{column:0, row:0, value:4},{column:0, row:0, value:8}],
	[{column:0, row:0, value:2},{column:0, row:0, value:4},{column:0, row:0, value:8},{column:0, row:0, value:16}],
	[{column:0, row:0, value:4},{column:0, row:0, value:16},{column:0, row:0, value:2},{column:0, row:0, value:8}],
	[{column:0, row:0, value:8},{column:0, row:0, value:2},{column:0, row:0, value:8},{column:0, row:0, value:64}]
];

const testWinBoard = [
	[{column:0, row:0, value:2048},{column:0, row:0, value:2},{column:0, row:0, value:4},{column:0, row:0, value:8}],
	[{column:0, row:0, value:2},{column:0, row:0, value:4},{column:0, row:0, value:8},{column:0, row:0, value:16}],
	[{column:0, row:0, value:4},{column:0, row:0, value:16},{column:0, row:0, value:2},{column:0, row:0, value:8}],
	[{column:0, row:0, value:8},{column:0, row:0, value:2},{column:0, row:0, value:8},{column:0, row:0, value:64}]
];



it('creates a new board with two tiles', () => {
	const board = initBoard();
	let counter = 0;

	for (let row = 0; row < 4; ++row) {
		for (let column = 0; column < 4; ++column) {
			if (board[row][column].value !== 0) {
				counter++;
			}
		}
	}

	expect(counter).toEqual(2);

});

it('rotates the board to the left', () => {
	const rotatedBoard = rotateLeft(testBoard);
	const exectedValue = rotatedBoard[3][1].value;

	expect(exectedValue).toEqual(2);

});

it('sets the row and column index for each tile', () => {
	const board = setPositions(testBoard);
	const exectedValue = board[3][3].column;

	expect(exectedValue).toEqual(3);

});

it('moves tiles to the left and merges them ', () => {
	const board = moveLeft(testBoard);
	const exectedValue = board[0][0].value;

	expect(exectedValue).toEqual(4);

});

it('checks for full board', () => {
	const isFull = isBoardFull(testGameOverBoard);

	expect(isFull).toEqual(true);

});

it('checks for not full board', () => {
	const isFull = isBoardFull(testBoard);

	expect(isFull).toEqual(false);

});

it('checks for game over', () => {
	const isGameover = checkForGameOver(testGameOverBoard);

	expect(isGameover).toEqual(true);

});

it('checks for not game over', () => {
	const isGameover = checkForGameOver(testBoard);

	expect(isGameover).toEqual(false);

});

it('checks for a completed game', () => {
	const isWon = isGameCompleted(testWinBoard);

	expect(isWon).toEqual(true);

});

it('checks for a not completed game', () => {
	const isWon = isGameCompleted(testGameOverBoard);

	expect(isWon).toEqual(false);

});





