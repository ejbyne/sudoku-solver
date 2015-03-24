function Solver() {}

Solver.prototype.solveBoard = function(board) {
	var counter = 1;
	while (counter < 30) {
		for (var cell in board.grid) {
			if (Array.isArray(board.grid[cell])) {
				this._checkCells(board);
			}
		}
		counter ++;
	}
};

Solver.prototype._checkCells = function(board) {
	for (var cell in board.grid) {
		if (Array.isArray(board.grid[cell])) {
			this._checkRelevantCells(cell, board);
			this._removeArrayIfLastNumber(cell, board);
		}
		this._checkOtherRelevantCells(cell, board);
	}
};

Solver.prototype._checkRelevantCells = function(cell, board) {
	this._checkCellRow(cell, board);
	this._checkCellColumn(cell, board);
	this._checkCellBlock(cell, board);
};

Solver.prototype._checkCellRow = function(cell, board) {
	var row = board.findRow(cell);
	this._removeExistingNumbers(cell, board, row);
	this._checkForDoubles(cell, row);
	this._checkForTriples(cell, row);
};

Solver.prototype._checkCellColumn = function(cell, board) {
	var column = board.findColumn(cell);
	this._removeExistingNumbers(cell, board, column);
	this._checkForDoubles(cell, column);
	this._checkForTriples(cell, column);
};

Solver.prototype._checkCellBlock = function(cell, board) {
	var block = board.findBlock(cell);
	this._removeExistingNumbers(cell, board, block);
	this._checkForDoubles(cell, block);
	this._checkForTriples(cell, block);
};

Solver.prototype._checkOtherRelevantCells = function(cell, board) {
	if (Array.isArray(board.grid[cell])) {
		var otherRelevantCells = board.findOtherRelevantCells(cell);
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

Solver.prototype._checkForDoubles = function(cell, section) {
	if (cell.length === 2) {
		var doubleCount = section.filter(function(sectionCell) {
			return cell.toString() === sectionCell.toString();
		}).length;
		if (doubleCount === 2) {
			section.forEach(function(sectionCell) {
				if (cell.toString() !== sectionCell.toString() && Array.isArray(sectionCell)) {
					cell.forEach(function(number) {
						if (sectionCell.indexOf(number) > -1) {
							sectionCell.splice(sectionCell.indexOf(number), 1);
						}
					});
				}
			});
		}
	}
};

Solver.prototype._checkForTriples = function(cell, section) {
	if (cell.length === 2 || cell.length === 3) {
		var tripleCount = section.filter(function(sectionCell) {
			return (
				Array.isArray(sectionCell) &&
				(sectionCell.length === 2 || sectionCell.length === 3) &&
				sectionCell.filter(function(number) {
					return cell.indexOf(number) > -1;
				}).length === sectionCell.length
			);
		}).length;
		if (tripleCount === 3) {
			section.forEach(function(sectionCell) {
				if (Array.isArray(sectionCell) &&
					sectionCell.filter(function(number) {
						return cell.indexOf(number) > -1;
					}).length !== sectionCell.length) {
					cell.forEach(function(number) {
						if (sectionCell.indexOf(number) > -1) {
							sectionCell.splice(sectionCell.indexOf(number), 1);
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
