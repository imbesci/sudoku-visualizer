// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import SudokuSolver from './SudokuSolver';

const board = "0,4,9,0,3,1,0,0,0,0,3,0,0,7,9,8,0,8,0,0,0,4,0,0,0,0,0,0,6,1,5,7,8,0,2,0,5,0,2,8,4,1,0,6,0,1,0,0,0,0,0,0,5,0,8,5,7,0,3,4,0,9,0,0,2,0,0,5,3,7,0,0,0,4,0,2,0,5,0,1";

const puzzle = new SudokuSolver(board);

test('board cleaning removes commas', () => {
    expect(puzzle.validBoardFormat()).toBe(
        [0, 4, 9, 0, 3, 1, 0, 0, 0,
        0, 3, 0, 0, 7, 0, 9, 8, 0, 
        8, 0, 0, 0, 4, 0, 0, 0, 0, 
        0, 0, 6, 1, 5, 7, 8, 0, 2, 
        0, 5, 0, 2, 8, 4, 1, 0, 6, 
        0, 1, 0, 0, 0, 0, 0, 0, 5, 
        0, 8, 5, 7, 0, 3, 4, 0, 9, 
        0, 0, 2, 0, 0, 5, 3, 7, 0, 
        0, 0, 4, 0, 2, 0, 5, 0, 1]
    )
})