[![Code Climate](https://codeclimate.com/github/ejbyne/sudoku-solver/badges/gpa.svg)](https://codeclimate.com/github/ejbyne/sudoku-solver)
[![Test Coverage](https://codeclimate.com/github/ejbyne/sudoku-solver/badges/coverage.svg)](https://codeclimate.com/github/ejbyne/sudoku-solver)

# Sudoku Challenge

## Summary

This was a challenge to build a Sudoku checker that can automatically generate and solve any 9 x 9 Sudoku grid such as the example shown on the Wikipedia [Sudoku entry](http://en.wikipedia.org/wiki/Sudoku).

I opted to build the app using Node.js and JavaScript. The app currently solves Sudoku puzzles on The Times' [website](http://www.thetimes.co.uk/tto/puzzles/sudoku) which have a rating of "mild", "easy" or difficult". It does not currently solve puzzles with a rating of "fiendish" and the logic would need to be improved in order achieve this.

The live version of the app is available [here](https://eds-sudoku-solver.herokuapp.com).

## Technologies

- Node.js
- Express.js
- JavaScript
- Jasmine Node
- JSHint
- Mocha
- CasperJS
- Chai
- Grunt
- HTML
- CSS

## Screenshots

### Number entry screen
<img src="images/numberentry_screenshot.png">

### Solution screen
<img src="images/solution_screenshot.png">

## Instructions

To try the app locally, please clone this repository on your machine:

```
$ git clone https://github.com/ejbyne/sudoku-solver.git
```

Change into the directory and npm install the modules:

```
$ cd sudoku-solver
$ npm install
```

Start the node server:

```
$ npm start
```

Visit <a href="http://localhost:3000">http://localhost:3000</a>.

Run the tests:

```
$ grunt
```

## To do list

- Improve logic to solve "fiendish" level puzzles
- Turn into single page app with Ajax requests
- Improve CSS
