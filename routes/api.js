'use strict'

const SudokuSolver = require('../controllers/sudoku-solver.js')

module.exports = function (app) {
  let solver = new SudokuSolver()

  app.route('/api/check').post((req, res) => {})

  app.route('/api/solve').post((req, res) => {
    let puzzleString = req.body.puzzle
    let result

    // Check if valid
    puzzleString = solver.validate(puzzleString)
    if (puzzleString.error) {
      return res.json(puzzleString)
    }

    // Check if can be solved with backtracking algorithm
    result = solver.solve(puzzleString)
    if (result.error) {
      return res.json(result)
    }
    return res.json(result)
  })
}
