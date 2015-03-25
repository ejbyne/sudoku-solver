function Solver() {}

Solver.prototype.solveBoard = function(board) {
	for (var cell in board.grid) {
		if (Array.isArray(board.grid[cell])) {
			this._checkCells(board);
		}
	}
};

Solver.prototype._checkCells = function(board) {
	for (var cell in board.grid) {
		if (Array.isArray(board.grid[cell])) {
			this._checkRelevantCells(cell, board);
			this._removeArrayIfLastNumber(cell, board);
		}
	}
};

Solver.prototype._checkRelevantCells = function(cell, board) {
	this._checkCellRow(cell, board);
	this._checkCellColumn(cell, board);
	this._checkCellBlock(cell, board);
	this._checkOtherRelevantCells(cell, board);
};

Solver.prototype._checkCellRow = function(cell, board) {
	var row = board.findRow(cell);
	this._removeExistingNumbers(cell, board, row);
	this._checkForDoubles(cell, board, row);
	this._checkForTriples(cell, board, row);
};

Solver.prototype._checkCellColumn = function(cell, board) {
	var column = board.findColumn(cell);
	this._removeExistingNumbers(cell, board, column);
	this._checkForDoubles(cell, board, column);
	this._checkForTriples(cell,board, column);
};

Solver.prototype._checkCellBlock = function(cell, board) {
	var block = board.findBlock(cell);
	this._removeExistingNumbers(cell, board, block);
	this._checkForDoubles(cell, board, block);
	this._checkForTriples(cell, board, block);
};

Solver.prototype._checkOtherRelevantCells = function(cell, board) {
	if (Array.isArray(board.grid[cell])) {
		var otherRelevantCells = board.findOtherRelevantCoords(cell);
		board.grid[cell].forEach(function(number) {
			if (otherRelevantCells.filter(function(cell) {
				return board.grid[cell] === number;
			}).length === 4) {
				board.grid[cell] = number;
				return;
			}
		});
	}
};

Solver.prototype._removeExistingNumbers = function(cell, board, section) {
	section.forEach(function(otherCell) {
		if (board.grid[cell].indexOf(board.grid[otherCell]) > -1) {
			var index = board.grid[cell].indexOf(board.grid[otherCell]);
			board.grid[cell].splice(index, 1);
		}
	});
};

Solver.prototype._checkForDoubles = function(cell, board, section) {
	if (board.grid[cell].length === 2) {
		var doubleCount = section.filter(function(sectionCell) {
			return board.grid[cell].toString() === board.grid[sectionCell].toString();
		}).length;
		if (doubleCount === 2) {
			section.forEach(function(sectionCell) {
				if (board.grid[cell].toString() !== board.grid[sectionCell].toString() && Array.isArray(board.grid[sectionCell])) {
					board.grid[cell].forEach(function(number) {
						if (board.grid[sectionCell].indexOf(number) > -1) {
							board.grid[sectionCell].splice(board.grid[sectionCell].indexOf(number), 1);
						}
					});
				}
			});
		}
	}
};

Solver.prototype._checkForTriples = function(cell, board, section) {
	if (board.grid[cell].length === 2 || board.grid[cell].length === 3) {
		var tripleCount = section.filter(function(sectionCell) {
			return (
				Array.isArray(board.grid[sectionCell]) &&
				(board.grid[sectionCell].length === 2 || board.grid[sectionCell].length === 3) &&
				board.grid[sectionCell].filter(function(number) {
					return board.grid[cell].indexOf(number) > -1;
				}).length === board.grid[sectionCell].length
			);
		}).length;
		if (tripleCount === 3) {
			section.forEach(function(sectionCell) {
				if (Array.isArray(board.grid[sectionCell]) &&
					board.grid[sectionCell].filter(function(number) {
						return board.grid[cell].indexOf(number) > -1;
					}).length !== board.grid[sectionCell].length) {
					board.grid[cell].forEach(function(number) {
						if (board.grid[sectionCell].indexOf(number) > -1) {
							board.grid[sectionCell].splice(board.grid[sectionCell].indexOf(number), 1);
						}
					});
				}
			});
		}
	}
};

Solver.prototype._removeArrayIfLastNumber = function(cell, board) {
	if (board.grid[cell].length === 1) {
		board.grid[cell] = board.grid[cell][0];
	}
};

Solver.prototype._repeatIfAnyCellNotSolved = function(board) {

};

module.exports = Solver;
