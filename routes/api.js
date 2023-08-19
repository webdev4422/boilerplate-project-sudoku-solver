'use strict'

const SudokuSolver = require('../controllers/sudoku-solver.js')

module.exports = function (app) {
  let solver = new SudokuSolver()

  app.route('/api/check').post((req, res) => {
    let { puzzle, coordinate, value } = req.body
    let conflicts = []
    let coords

    if (!puzzle || !coordinate || !value) {
      return res.json({ error: 'Required field(s) missing' })
    }

    // Check if valid puzzle
    puzzle = solver.validate(puzzle)
    if (puzzle.error) {
      return res.json(puzzle) // res with error
    }

    // Check if valid value
    value = solver.checkValue(value)
    if (value.error) {
      return res.json(value) // res with error
    }

    // Check if valid coordinates
    coords = solver.checkCoordinate(coordinate)
    if (coords.error) {
      return res.json(coords) // res with error
    }
    let { row, column } = coords

    // Check all this shit
    const isRowValid = solver.checkRowPlacement(puzzle, row, column, value)
    if (!isRowValid) conflicts.push('row')

    const isColValid = solver.checkColPlacement(puzzle, row, column, value)
    if (!isColValid) conflicts.push('column')

    const isRegionValid = solver.checkRegionPlacement(puzzle, row, column, value)
    if (!isRegionValid) conflicts.push('region')

    if (puzzle[row * 9 + column] === value) {
      return res.json({ valid: true })
    }

    if (isRowValid && isColValid && isRegionValid) {
      return res.json({ valid: true })
    } else {
      return res.json({ valid: false, conflict: conflicts })
    }
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
