'use strict'

const SudokuSolver = require('../controllers/sudoku-solver.js')

module.exports = function (app) {
  let solver = new SudokuSolver()

  app.route('/api/check').post((req, res) => {
    let { puzzle, coordinate, value } = req.body

    if (!puzzle || !coordinate || !value) {
      return res.json({ error: 'Required field(s) missing' })
    }

    // Check if valid puzzle
    puzzle = solver.validate(puzzle)
    if (puzzle.error) {
      return res.json(puzzle)
    }
    // console.log(puzzle)

    // Check if valid value
    value = solver.checkValue(value)
    if (value.error) {
      return res.json(value)
    }
    // console.log(value)

    // Check if valid coordinates
    let coords = solver.checkCoordinate(coordinate)
    if (coords.error) {
      return res.json(coords.error)
    }
    const { row, column } = coords
    res.end()
  })

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
