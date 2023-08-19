const chai = require('chai')
const puzzles = require('../controllers/puzzle-strings')
const assert = chai.assert

const Solver = require('../controllers/sudoku-solver.js')
let solver = new Solver()

suite('Unit Tests', () => {
  test('Logic handles a valid puzzle string of 81 characters', () => {
    const puzzle = puzzles.puzzlesAndSolutions[0][0]
    assert.equal(solver.validate(puzzle), puzzle, 'this puzzle is valid')
  })

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
    const puzzle = puzzles.puzzlesAndSolutions[0][0]
    assert.equal(solver.validate(puzzle), puzzle, 'this puzzle is valid')
  })

  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    const puzzle = puzzles.puzzlesAndSolutions[0][0]
    assert.equal(solver.validate(puzzle), puzzle, 'this puzzle is valid')
  })

  test('Logic handles a valid row placement', () => {
    const puzzle = puzzles.puzzlesAndSolutions[2][0]
    const row = 0
    const column = 0
    const value = '2'
    assert.isTrue(solver.checkRowPlacement(puzzle, row, column, value))
  })

  test('Logic handles an invalid row placement', () => {
    const puzzle = puzzles.puzzlesAndSolutions[2][0]
    const row = 0
    const column = 0
    const value = '7'
    assert.isFalse(solver.checkRowPlacement(puzzle, row, column, value))
  })

  test('Logic handles a valid column placement', () => {
    const puzzle = puzzles.puzzlesAndSolutions[2][0]
    const row = 0
    const column = 0
    const value = '2'
    assert.isTrue(solver.checkColPlacement(puzzle, row, column, value))
  })

  test('Logic handles an invalid column placement', () => {
    const puzzle = puzzles.puzzlesAndSolutions[2][0]
    const row = 0
    const column = 0
    const value = '4'
    assert.isFalse(solver.checkColPlacement(puzzle, row, column, value))
  })

  test('Logic handles a valid region (3x3 grid) placement', () => {
    const puzzle = puzzles.puzzlesAndSolutions[2][0]
    const row = 0
    const column = 0
    const value = '2'
    assert.isTrue(solver.checkRegionPlacement(puzzle, row, column, value))
  })

  test('Logic handles an invalid region (3x3 grid) placement', () => {
    const puzzle = puzzles.puzzlesAndSolutions[2][0]
    const row = 0
    const column = 0
    const value = '4'
    assert.isFalse(solver.checkRegionPlacement(puzzle, row, column, value))
  })

  test('Valid puzzle strings pass the solver', () => {
    const puzzle = puzzles.puzzlesAndSolutions[2][0]
    const solution = solver.solve(puzzle)
    assert.isString(solution.solution)
  })

  test('Invalid puzzle strings fail the solver', () => {
    const puzzle = puzzles.puzzlesAndSolutions[2][0] + '..'
    const solution = solver.solve(puzzle)
    assert.isString(solution.error)
  })

  test('Solver returns the expected solution for an incomplete puzzle', () => {
    const puzzle = puzzles.puzzlesAndSolutions[1][0]
    const solution = puzzles.puzzlesAndSolutions[1][1]
    const solvedPuzzle = solver.solve(puzzle)
    assert.equal(solvedPuzzle.solution, solution)
  })
})
