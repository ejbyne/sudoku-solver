function Solver() {}

Solver.prototype.solveBoard = function(board) {
	for (var coord in board.grid) {
		if (Array.isArray(board.grid[coord])) {
			this._checkCells(board);
		}
	}
};

Solver.prototype._checkCells = function(board) {
	for (var coord in board.grid) {
		if (Array.isArray(board.grid[coord])) {
			this._checkRelevantCells(coord, board);
			this._removeArrayIfLastNumber(coord, board);
		}
	}
};

Solver.prototype._checkRelevantCells = function(coord, board) {
	this._removeInvalidNumbers(coord, board, board.findRow(coord));
	this._removeInvalidNumbers(coord, board, board.findColumn(coord));
	this._removeInvalidNumbers(coord, board, board.findBlock(coord));
	this._checkOtherRelevantCells(coord, board);
};

Solver.prototype._removeInvalidNumbers = function(coord, board, section) {
	this._removeExistingNumbers(coord, board, section);
	this._checkForDoubles(coord, board, section);
	this._checkForTriples(coord, board, section);
};

Solver.prototype._checkOtherRelevantCells = function(coord, board) {
	board.grid[coord].forEach(function(number) {
		if (board.findOtherRelevantCoords(coord).filter(function(otherCoord) {
			return board.grid[otherCoord] === number;
		}).length === 4) {
			board.grid[coord] = number;
			return;
		}
	});
};

Solver.prototype._removeExistingNumbers = function(coord, board, section) {
	section.forEach(function(sectionCoord) {
		if (board.grid[coord].indexOf(board.grid[sectionCoord]) > -1) {
			var index = board.grid[coord].indexOf(board.grid[sectionCoord]);
			board.grid[coord].splice(index, 1);
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

module.exports = Solver;
