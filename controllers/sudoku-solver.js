class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString) {
      return { error: 'Required field missing' }
    } else if (puzzleString.length !== 81) {
      return { error: 'Expected puzzle to be 81 characters long' }
    } else if (puzzleString.length == 81) {
      // Check if string conatain any characters except dots and digits
      if (puzzleString.match(/[^.1-9]/) != null) {
        return { error: 'Invalid characters in puzzle' }
      } else {
        // Pass all checks, return string
        return puzzleString
      }
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver
