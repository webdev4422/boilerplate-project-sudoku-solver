'use strict'

const SudokuSolver = require('../controllers/sudoku-solver.js')

module.exports = function (app) {
  let solver = new SudokuSolver()

  app.route('/api/check').post((req, res) => {})

  app.route('/api/solve').post((req, res) => {
    let puzzleString = req.body.puzzle

    puzzleString = solver.validate(puzzleString)
    if (puzzleString.error) {
      return res.json(puzzleString)
    }

    puzzleString = solver.checkColPlacement(puzzleString)


    // puzzleString = solver.checkRowPlacement(puzzleString)
    // puzzleString = solver.checkRegionPlacement(puzzleString)

    res.end()
  })
}
