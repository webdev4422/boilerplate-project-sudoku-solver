const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert
const server = require('../server')
const puzzles = require('../controllers/puzzle-strings')

chai.use(chaiHttp)

suite('Functional Tests', () => {
  test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
    const puzzle = puzzles.puzzlesAndSolutions[0][0]
    const solution = puzzles.puzzlesAndSolutions[0][1]
    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.solution, solution)
        done()
      })
  })

  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
    chai
      .request(server)
      .post('/api/solve')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Required field missing')
        done()
      })
  })

  test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
    const puzzle =
      'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Invalid characters in puzzle')
        done()
      })
  })

  test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
    const puzzle = puzzles.puzzlesAndSolutions[0][0] + 'FFFFFFFF'
    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        done()
      })
  })

  test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
    const puzzle =
      '77.89....75..7.3.4.2..4..1.5689..472...6..7..1.7.5.63873.1.2.8.6..47.1..2.9.387.6'
    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Puzzle cannot be solved')
        done()
      })
  })

  test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
    const puzzle =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const coordinate = 'A1'
    const value = '7'
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle, coordinate, value })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.isTrue(res.body.valid)
        done()
      })
  })

  test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
    const puzzle =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const coordinate = 'A1'
    const value = '6'
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle, coordinate, value })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.property(res.body, 'valid')
        assert.property(res.body, 'conflict')
        assert.isFalse(res.body.valid)
        assert.isArray(res.body.conflict)
        assert.include(res.body.conflict, 'column')
        done()
      })
  })

  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
    const puzzle =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const coordinate = 'A1'
    const value = '1'
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle, coordinate, value })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.property(res.body, 'valid')
        assert.property(res.body, 'conflict')
        assert.isFalse(res.body.valid)
        assert.isArray(res.body.conflict)
        assert.include(res.body.conflict, 'row')
        assert.include(res.body.conflict, 'column')
        done()
      })
  })

  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
    const puzzle =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const coordinate = 'A1'
    const value = '5'
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle, coordinate, value })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.property(res.body, 'valid')
        assert.property(res.body, 'conflict')
        assert.isFalse(res.body.valid)
        assert.isArray(res.body.conflict)
        assert.include(res.body.conflict, 'row')
        assert.include(res.body.conflict, 'column')
        assert.include(res.body.conflict, 'region')
        done()
      })
  })

  test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
    chai
      .request(server)
      .post('/api/check')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Required field(s) missing')
        done()
      })
  })

  test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
    const puzzle =
      '..9..5.1.85.4....2432..0...1a..69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const coordinate = 'A1'
    const value = '1'
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle, coordinate, value })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Invalid characters in puzzle')
        done()
      })
  })

  test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6'
    const coordinate = 'A1'
    const value = '1'
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle, coordinate, value })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        done()
      })
  })

  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
    const puzzle =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const coordinate = 'FF'
    const value = '1'
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle, coordinate, value })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Invalid coordinate')
        done()
      })
  })

  test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
    const puzzle =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const coordinate = 'A1'
    const value = 'FFF'
    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle, coordinate, value })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Invalid value')
        done()
      })
  })
})
