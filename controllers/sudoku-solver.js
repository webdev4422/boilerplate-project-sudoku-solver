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

  solve(puzzleString) {
    const puz = puzzleString.split('')
    const _board = []

    for (let i = 0; i < puz.length; i += 9) {
      _board.push([
        puz[i],
        puz[i + 1],
        puz[i + 2],
        puz[i + 3],
        puz[i + 4],
        puz[i + 5],
        puz[i + 6],
        puz[i + 7],
        puz[i + 8],
      ])
    }

    // *** STACKOVERFLOW START ***
    // Sudoku solver in JS from stackoverflow https://stackoverflow.com/a/55757694

    // Replace _board with MY board
    // const _board = [
    //   ['.', '9', '.', '.', '4', '2', '1', '3', '6'],
    //   ['.', '.', '.', '9', '6', '.', '4', '8', '5'],
    //   ['.', '.', '.', '5', '8', '1', '.', '.', '.'],
    //   ['.', '.', '4', '.', '.', '.', '.', '.', '.'],
    //   ['5', '1', '7', '2', '.', '.', '9', '.', '.'],
    //   ['6', '.', '2', '.', '.', '.', '3', '7', '.'],
    //   ['1', '.', '.', '8', '.', '4', '.', '2', '.'],
    //   ['7', '.', '6', '.', '.', '.', '8', '1', '.'],
    //   ['3', '.', '.', '.', '9', '.', '.', '.', '.'],
    // ]

    sodokoSolver(_board)
    // console.log(_board)

    function isValid(board, row, col, k) {
      for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3)
        const n = 3 * Math.floor(col / 3) + (i % 3)
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
          return false
        }
      }
      return true
    }

    function sodokoSolver(data) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (data[i][j] == '.') {
            for (let k = 1; k <= 9; k++) {
              if (isValid(data, i, j, k)) {
                data[i][j] = `${k}`
                if (sodokoSolver(data)) {
                  return true
                } else {
                  data[i][j] = '.'
                }
              }
            }
            return false
          }
        }
      }
      return true
    }
    // *** STACKOVERFLOW END ***
    // MY CODE
    const result = _board.join('').split(',').join('')
    if (result.match(/\./)) {
      return { error: 'Puzzle cannot be solved' }
    }
    return { solution: result }
  }
}

module.exports = SudokuSolver
