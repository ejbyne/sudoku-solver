function Board() {
	this.grid = {};
}

Board.prototype.LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
Board.prototype.NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
Board.prototype.LETTER_ARRAYS = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']];
Board.prototype.NUMBER_ARRAYS = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];

Board.prototype.createGrid = function() {
	var _this = this;
	this.LETTERS.forEach(function(letter) {
		_this.NUMBERS.forEach(function(number) {
			_this.grid[letter + number] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		});
	});
};

Board.prototype.insertInitialNumber = function(coord, number) {
	if (number < 1 || number > 9 || Math.floor(number) !== number) {
		throw "Invalid number. Please only insert numbers 1 to 9.";
	}
	this.grid[coord] = number;
};

Board.prototype.findRow = function(coord) {
	return this._findSelectedCells(coord, 0);
};

Board.prototype.findColumn = function(coord) {
	return this._findSelectedCells(coord, 1);
};

Board.prototype.findBlock = function(coord) {
	var letters = this._findLetterArray(coord);
	var numbers = this._findNumberArray(coord);
	return ([letters[0] + numbers[0], letters[0] + numbers[1], letters[0] + numbers[2],
					 letters[1] + numbers[0], letters[1] + numbers[1], letters[1] + numbers[2],
					 letters[2] + numbers[0], letters[2] + numbers[1], letters[2] + numbers[2]]);
};

Board.prototype.findOtherRelevantCells = function(coord) {
	var _this = this;
	var letters = this._findLetterArray(coord);
	var numbers = this._findNumberArray(coord);
	var otherRelevantCells = [];
	letters.forEach(function(letter) {
		_this.NUMBERS.forEach(function(NUMBER) {
			if (_this.findBlock(coord).indexOf(letter + NUMBER) === -1 &&
				_this.findRow(coord).indexOf(letter + NUMBER) === -1 &
				_this.findColumn(coord).indexOf(letter + NUMBER) === -1) {
				otherRelevantCells.push(letter + NUMBER);
			}
		});
	});
	numbers.forEach(function(number) {
		_this.LETTERS.forEach(function(LETTER) {
			if (_this.findBlock(coord).indexOf(LETTER + number) === -1 &&
				_this.findRow(coord).indexOf(LETTER + number) === -1 &&
				_this.findColumn(coord).indexOf(LETTER + number) === -1) {
				otherRelevantCells.push(LETTER + number);
			}
		});
	});
	return otherRelevantCells;
};

Board.prototype.splitGridCoordsIntoRows = function() {
	var coords = Object.keys(this.grid);
	return coords.map(function(coord) {
		return coords.splice(0, 9);
	}).slice(0, 9);
};

Board.prototype._findSelectedCells = function(coord, characterNumber) {
	return Object.keys(this.grid).filter(function(cell) {
		return coord[characterNumber] === cell[characterNumber];
	});
};

Board.prototype._findLetterArray = function(coord) {
	return this._findSelectedArray(coord, 0, this.LETTER_ARRAYS);
};

Board.prototype._findNumberArray = function(coord) {
	return this._findSelectedArray(coord, 1, this.NUMBER_ARRAYS);
	
};

Board.prototype._findSelectedArray = function(coord, characterNumber, arrays) {
	return arrays.filter(function(arrayOption) {
		return arrayOption.indexOf(coord[characterNumber]) > -1;
	})[0];
};

module.exports = Board;
