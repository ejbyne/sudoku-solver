var Board = function() {
  this.grid = {};
};

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

Board.prototype.splitGridCoordsIntoRows = function() {
  var coords = Object.keys(this.grid);
  return coords.map(function(coord) {
    return coords.splice(0, 9);
  }).slice(0, 9);
};

Board.prototype.findRow = function(coord) {
  return this._findSelectedCoords(coord, 0);
};

Board.prototype.findColumn = function(coord) {
  return this._findSelectedCoords(coord, 1);
};

Board.prototype.findBlock = function(coord) {
  var letters = this._findLetterArray(coord);
  var numbers = this._findNumberArray(coord);
  return ([letters[0] + numbers[0], letters[0] + numbers[1], letters[0] + numbers[2],
           letters[1] + numbers[0], letters[1] + numbers[1], letters[1] + numbers[2],
           letters[2] + numbers[0], letters[2] + numbers[1], letters[2] + numbers[2]]);
};

Board.prototype.findOtherRelevantCoords = function(coord) {
  var otherRelevantCoords = [];
  this._findOtherHorizontalCoords(coord, this._findLetterArray(coord), otherRelevantCoords);
  this._findOtherVerticalCoords(coord, this._findNumberArray(coord), otherRelevantCoords);
  return otherRelevantCoords;
};

Board.prototype._findSelectedCoords = function(coord, characterNumber) {
  return Object.keys(this.grid).filter(function(otherCoord) {
    return coord[characterNumber] === otherCoord[characterNumber];
  });
};

Board.prototype._findLetterArray = function(coord) {
  return this._findSelectedArray(coord, 0, this.LETTER_ARRAYS);
};

Board.prototype._findNumberArray = function(coord) {
  return this._findSelectedArray(coord, 1, this.NUMBER_ARRAYS);
  
};

Board.prototype._findSelectedArray = function(coord, characterNumber, arrayOptions) {
  return arrayOptions.filter(function(arrayOption) {
    return arrayOption.indexOf(coord[characterNumber]) > -1;
  })[0];
};

Board.prototype._findOtherHorizontalCoords = function(coord, letters, coordArray) {
  var _this = this;
  letters.forEach(function(letter) {
    _this.NUMBERS.forEach(function(NUMBER) {
      if (_this.findBlock(coord).indexOf(letter + NUMBER) === -1 &&
        _this.findRow(coord).indexOf(letter + NUMBER) === -1 &&
        _this.findColumn(coord).indexOf(letter + NUMBER) === -1) {
        coordArray.push(letter + NUMBER);
      }
    });
  });
};

Board.prototype._findOtherVerticalCoords = function(coord, numbers, coordArray) {
  var _this = this;
  numbers.forEach(function(number) {
    _this.LETTERS.forEach(function(LETTER) {
      if (_this.findBlock(coord).indexOf(LETTER + number) === -1 &&
        _this.findRow(coord).indexOf(LETTER + number) === -1 &&
        _this.findColumn(coord).indexOf(LETTER + number) === -1) {
        coordArray.push(LETTER + number);
      }
    });
  });
};

module.exports = Board;
