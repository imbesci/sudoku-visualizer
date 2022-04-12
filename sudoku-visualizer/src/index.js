import React from 'react';
import {useState, useEffect, useRef} from 'react';
import reactDOM from 'react-dom/client';
import './index.css';
import SudokuSolver from './components/SudokuSolver';
import InputSudokuBoard from './components/InputSudokuBoard'
import Grid from './components/Grid';
// import reportWebVitals from './reportWebVitals';

function Sudoku(){
  const [inputString, setInputString] = useState(null);
  let sudokuBoard = useRef()

  function handleBoardSubmit(e){
    e.preventDefault()
    const inputValue = e.target[0].value
    sudokuBoard.current = new SudokuSolver(inputValue)
    if (sudokuBoard.current.clean()){
      setInputString(inputValue)
    }
    e.target.reset()
  }

    if (!inputString){
      return(<InputSudokuBoard handleBoard={handleBoardSubmit}/>)
    }

    return(
      <Grid arr={sudokuBoard.current.board} />
    )
}


const root = reactDOM.createRoot(document.getElementById("root"))
root.render(<Sudoku />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
