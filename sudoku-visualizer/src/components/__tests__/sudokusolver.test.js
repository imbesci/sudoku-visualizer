import SudokuSolver from "../SudokuSolver.js";

const board = "0,4,9,0,3,1,0,0,0,0,3,0,0,7,0,9,8,0,8,0,0,0,4,0,0,0,0,0,0,6,1,5,7,8,0,2,0,5,0,2,8,4,1,0,6,0,1,0,0,0,0,0,0,5,0,8,5,7,0,3,4,0,9,0,0,2,0,0,5,3,7,0,0,0,4,0,2,0,5,0,1";
const boardCrazy = "0,4,9,0,3,1,0,0,0,0,3,,,,,,,,0,0,7,0,9,8,0,8,0,0,0,4,0,0,0,0,0,0,6,1,5,7,8,0,2,0,5,0,2,8,4,1,0,6,0,1,0,0,0,0,0,0,5,0,8,5,7,0,3,4,0,9,0,0,2,0,0,5,3,7,0,0,0,4,0,2,0,5,0,1";
const boardNoCommas = "049031000030070980800040000006157802050284106010000005085703409002005370004020501"
const notPoss = "1,4,9,0,3,1,0,0,0,0,3,0,0,7,0,9,8,0,8,0,5,6,4,0,0,0,0,0,0,6,1,5,7,8,0,2,0,5,0,2,8,4,1,0,6,0,1,0,0,0,0,0,0,5,0,8,5,7,0,3,4,0,9,0,0,2,0,0,5,3,7,0,0,0,4,0,2,0,5,0,1";

const puzzle = new SudokuSolver(board);
const puzzleCrazy = new SudokuSolver(boardCrazy)
const puzzleNoCommas = new SudokuSolver(boardNoCommas);
const notPossBoard = new SudokuSolver(notPoss)
const solveTestBoard = new SudokuSolver(board)

test('board cleaning removes commas (standard format)', () => {
    expect(puzzle.validBoardFormat()).toBe(true)
})

test('board cleaning removes commas (excessive commas)', () => {
    expect(puzzleCrazy.validBoardFormat()).toBe(true)
})

test('board cleaning with no commas', () => {
    expect(puzzleNoCommas.validBoardFormat()).toBe(true)
})

test('board is properly formatted into 9x9 array', () => {
    puzzleNoCommas.configureBoardArray()
    expect(puzzleNoCommas.board).toStrictEqual([
        [0, 4, 9, 0, 3, 1, 0, 0, 0], 
        [0, 3, 0, 0, 7, 0, 9, 8, 0], 
        [8, 0, 0, 0, 4, 0, 0, 0, 0], 
        [0, 0, 6, 1, 5, 7, 8, 0, 2], 
        [0, 5, 0, 2, 8, 4, 1, 0, 6], 
        [0, 1, 0, 0, 0, 0, 0, 0, 5], 
        [0, 8, 5, 7, 0, 3, 4, 0, 9], 
        [0, 0, 2, 0, 0, 5, 3, 7, 0], 
        [0, 0, 4, 0, 2, 0, 5, 0, 1]])
})

test('validate row true', () => {
    expect(puzzleNoCommas.validInRow(5,2,3)).toBe(true)
})

test('validate row false', () => {
    expect(puzzleNoCommas.validInRow(8,2,3)).toBe(false)
})

test('validate column true', () => {
    expect(puzzleNoCommas.validInColumn(1,6,4)).toBe(true)
})


test('validate column false', () => {
    expect(puzzleNoCommas.validInColumn(8,6,4)).toBe(false)
})

test('validate cube true', () => {
    expect(puzzleNoCommas.validInCube(7,4,7)).toBe(true)
})


test('validate cube false', () => {
    expect(puzzleNoCommas.validInCube(6,4,7)).toBe(false)
})

test('validate position true', () => {
    expect(puzzleNoCommas.validPosition(5,2,3)).toBe(true)
})

test('validate position true (edge)', () => {
    expect(puzzleNoCommas.validPosition(1,6,0)).toBe(true)
})

test('validate position false (edge)', () => {
    expect(puzzleNoCommas.validPosition(7,8,5)).toBe(false)
})

test('solveboard (possible to solve)', () => {
    expect(puzzleNoCommas.solveBoard()).toBe(true)
})

test('solveboard (impossible to solve)', () => {
    notPossBoard.validBoardFormat()
    notPossBoard.configureBoardArray()
    expect(notPossBoard.solveBoard()).toBe(false)
})

test('solve', () => {
    expect(solveTestBoard.solve()).toStrictEqual([
        [2, 4, 9, 5, 3, 1, 6, 1, 3],
        [5, 3, 1, 6, 7, 8, 9, 8, 4], 
        [8, 6, 7, 9, 4, 2, 2, 5, 7], 
        [7, 2, 6, 1, 5, 7, 8, 3, 2], 
        [9, 5, 3, 2, 8, 4, 1, 4, 6], 
        [4, 1, 8, 3, 6, 9, 7, 9, 5], 
        [1, 8, 5, 7, 9, 3, 4, 2, 9], 
        [6, 7, 2, 4, 1, 5, 3, 7, 8], 
        [3, 9, 4, 8, 2, 6, 5, 6, 1]])
})