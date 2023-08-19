'use strict'

const SudokuSolver = require('../controllers/sudoku-solver.js')

module.exports = function (app) {
  let solver = new SudokuSolver()

  app.route('/api/check').post((req, res) => {})

  app.route('/api/solve').post((req, res) => {
    let puzzleString = req.body.puzzle

    puzzleString = solver.validate(puzzleString)
    if (!puzzleString) {
      return res.json({ error: 'Expected puzzle to be 81 characters long' })
    }

    res.end()
  })
}
