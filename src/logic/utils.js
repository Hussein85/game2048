// Create empty board
export const initBoard=()=>{
	let board = [];
	for (let i = 0; i < 4; i++) {
		let row = [];
		for (let j = 0; j < 4; j++) {
			row.push({
				value: 0,
				row: i,
				column: j,
				isMerged: false,
				isNew: false
			});
		}
		board.push(row);
	}

	board = addTileRandom(board);
	board = addTileRandom(board);

	return board;
};

// Moves the tiles according to direction
export const moveTiles=(direction, board)=>{
	// 0 -> left, 1 -> up, 2 -> right, 3 -> down

	board = clearTiles(board);
	for (let i = 0; i < direction; ++i) {
		board = rotateLeft(board);
	}
	board = moveLeft(board);
	for (let j = direction; j < 4; ++j) {
		board = rotateLeft(board);
	}

	board = addTileRandom(board);
	board = setPositions(board);

	return board;
};


// Add a tile on the board randomly
export const addTileRandom=(board)=>{
	const pool = getEmptyPos(board);
	const pos = pool[Math.floor(Math.random() * pool.length)];
	const TileValue = getRandomValue();
	if (pos) {
		board[pos.y][pos.x].value = TileValue;
		board[pos.y][pos.x].isNew = true;
	}

	return board;
};

// Returns an array of empty positions where an new tile could be added
export const getEmptyPos=(board)=>{
	let pool = [];

	for (let row = 0; row < 4; ++row) {
		for (let column = 0; column < 4; ++column) {
			if (board[row][column].value === 0) {
				pool.push({
					x: column,
					y: row
				});
			}
		}
	}

	return pool;
};

// Get random value: either 2 or 4.
export const getRandomValue=()=>{
	const randomNumValue = Math.random() < 0.5 ? 2 : 4;

	return randomNumValue;
};

// Move all tiles to the left and merge if possible.
export const moveLeft=(board)=>{

	for (let row = 0; row < 4; ++row) {

		let currentRow = board[row].filter((tile) => {
			return tile.value !== 0;
		});

		let resultRow = [];

		for (let target = 0; target < 4; ++target) {
			let targetTile = currentRow.length ? currentRow.shift() : createTile(0);

			// Merge tiles if possible
			if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
				let currentTile = currentRow.shift();
				targetTile.value += currentTile.value;
				targetTile.isMerged = true;
			}

			resultRow[target] = targetTile;
		}

		board[row] = resultRow;
	}

	return board;
};

// Creates a tile
export const createTile=(val)=>{
	let tile = {
		value: val,
		row: 0,
		column: 0,
		isMerged: false
	};

	return  tile;
};

// Set row and column index for each tile
export const setPositions=(board)=>{
	for (let row = 0; row < 4; ++row) {
		for (let column = 0; column < 4; ++column) {
			board[row][column].row = row;
			board[row][column].column = column;
		}
	}

	return board;
};

// Rotate the board to the left, since we are using the shift method
// which removes the first element from the array.
export const rotateLeft=(board)=>{
	let rows = board.length;
	let columns = board[0].length;
	let rotatedBoard = [];
	for (let row = 0; row < rows; ++row) {
		rotatedBoard.push([]);
		for (let column = 0; column < columns; ++column) {
			rotatedBoard[row][column] = board[column][columns - row - 1];
		}
	}

	return rotatedBoard;
};

// Check for game over
export const checkForGameOver=(board)=>{

	// If the board is not full, its not game over yet
	if (!isBoardFull(board)) {
		return false;
	}

	// if the board is full and the current tile have a neighbour with same number then its not game over
	if (isBoardFull(board)) {
		for (let row = 0; row < 4; ++row) {
			for (let column = 0; column < 4; ++column) {
				let currentTileValue = board[row][column].value;

        let leftTile = (column-1) < 0 ? undefined : board[row][column-1];
				let rightTile = (column+1) > 3 ? undefined : board[row][column+1];
				let topTile = (row-1) < 0 ? undefined : board[row-1][column];
				let bottomTile = (row+1) > 3 ? undefined : board[row+1][column];

				if (currentTileValue === (leftTile && leftTile.value) ||
          currentTileValue === (rightTile && rightTile.value) ||
          currentTileValue === (topTile && topTile.value) ||
          currentTileValue === (bottomTile && bottomTile.value)) {
					return false;
				}
			}
		}
	}

	// Its game over since the board is full and no possible merges are left
	return true;
};

// Check if the board is full
export const isBoardFull=(board)=>{
	for (let row = 0; row < 4; ++row) {
		for (let column = 0; column < 4; ++column) {
			if (board[row][column].value === 0) {
				return false;
			}
		}
	}

	return true;
};

// Check if the game is completed when tile value is reached to 2048
export const isGameCompleted=(board)=>{
	for (let row = 0; row < 4; ++row) {
		for (let column = 0; column < 4; ++column) {
			if (board[row][column].value === 2048) {
				return true;
			}
		}
	}

	return false;
};

// Sets isMerged to false
export const clearTiles=(board)=>{
	for (let row = 0; row < 4; ++row) {
		for (let column = 0; column < 4; ++column) {
			board[row][column].isMerged = false;
			board[row][column].isNew = false;
		}
	}

	return board;
};
