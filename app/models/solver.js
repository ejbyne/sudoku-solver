var Solver = function() {};

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
      this._checkRowColumnAndBlock(coord, board);
      this._checkOtherRelevantCells(coord, board);
      this._removeArrayIfLastNumber(coord, board);
    }
  }
};

Solver.prototype._checkRowColumnAndBlock = function(coord, board) {
  this._removeInvalidNumbers(coord, board, board.findRow(coord));
  this._removeInvalidNumbers(coord, board, board.findColumn(coord));
  this._removeInvalidNumbers(coord, board, board.findBlock(coord));
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

Solver.prototype._removeInvalidNumbers = function(coord, board, section) {
  this._removeExistingNumbers(coord, board, section);
  this._checkForDoubles(coord, board, section);
  this._checkForTriples(coord, board, section);
};

Solver.prototype._removeExistingNumbers = function(coord, board, section) {
  section.forEach(function(sectionCoord) {
    if (board.grid[coord].indexOf(board.grid[sectionCoord]) > -1) {
      var index = board.grid[coord].indexOf(board.grid[sectionCoord]);
      board.grid[coord].splice(index, 1);
    }
  });
};

Solver.prototype._checkForDoubles = function(coord, board, section) {
  if (board.grid[coord].length === 2 && this._isDoubleSet(coord, board, section)) {
    this._removeDoubleNumbersFromOtherSectionCells(coord, board, section);
  }
};

Solver.prototype._checkForTriples = function(coord, board, section) {
  if ((board.grid[coord].length === 2 || board.grid[coord].length === 3) &&
    this._isTripleSet(coord, board, section)) {
    this._removeTripleNumbersFromOtherSectionCells(coord, board, section);
  }
};

Solver.prototype._isDoubleSet = function(coord, board, section) {
  return section.filter(function(sectionCoord) {
      return board.grid[coord].toString() === board.grid[sectionCoord].toString();
  }).length === 2;
};

Solver.prototype._isTripleSet = function(coord, board, section) {
  return section.filter(function(sectionCoord) {
    return Array.isArray(board.grid[sectionCoord]) &&
    (board.grid[sectionCoord].length === 2 || board.grid[sectionCoord].length === 3) &&
    board.grid[sectionCoord].filter(function(number) {
      return board.grid[coord].indexOf(number) > -1;
    }).length === board.grid[sectionCoord].length;
  }).length === 3;
};

Solver.prototype._isNotTripleSet = function(coord, board, sectionCoord) {
  return board.grid[sectionCoord].filter(function(number) {
    return board.grid[coord].indexOf(number) > -1;
  }).length !== board.grid[sectionCoord].length;
};

Solver.prototype._removeDoubleNumbersFromOtherSectionCells = function(coord, board, section) {
  section.forEach(function(sectionCoord) {
    if (Array.isArray(board.grid[sectionCoord]) &&
      board.grid[coord].toString() !== board.grid[sectionCoord].toString()) {
      board.grid[coord].forEach(function(number) {
        if (board.grid[sectionCoord].indexOf(number) > -1) {
          board.grid[sectionCoord].splice(board.grid[sectionCoord].indexOf(number), 1);
        }
      });
    }
  });
};

Solver.prototype._removeTripleNumbersFromOtherSectionCells = function(coord, board, section) {
  var _this = this;
  section.forEach(function(sectionCoord) {
    if (Array.isArray(board.grid[sectionCoord]) &&
      _this._isNotTripleSet(coord, board, sectionCoord)) {
      board.grid[coord].forEach(function(number) {
        if (board.grid[sectionCoord].indexOf(number) > -1) {
          board.grid[sectionCoord].splice(board.grid[sectionCoord].indexOf(number), 1);
        }
      });
    }
  });
};

Solver.prototype._removeArrayIfLastNumber = function(cell, board) {
  if (board.grid[cell].length === 1) {
    board.grid[cell] = board.grid[cell][0];
  }
};

module.exports = Solver;
