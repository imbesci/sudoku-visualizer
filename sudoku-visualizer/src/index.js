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
  const [showFinalBoard, setShowFinalBoard] = useState(null)
  let sudokuBoardRef = useRef()
  let sudokuBoardCopyRef = useRef(null)
  let showSolutionAnimationRef = useRef(false)
  let wrongLocationsRef = useRef(null) 

  useEffect(() => {
    if (showFinalBoard) {
      const boardElements = document.getElementsByClassName("table-cell")
      for (let i = 0; i < wrongLocationsRef.current.length; i++){
        boardElements[wrongLocationsRef.current[i]].style.backgroundColor = "rgb(145, 255, 147)"
      }
    }
  },[showFinalBoard])

  function handleBoardSubmit(e){
    e.preventDefault()
    const inputValue = e.target[0].value
    sudokuBoardRef.current = new SudokuSolver(inputValue)
    if (sudokuBoardRef.current.clean()){
      sudokuBoardCopyRef.current = JSON.parse(JSON.stringify(sudokuBoardRef.current.board))
      setInputString(inputValue)
    }
    e.target.reset()
  }

  async function generateSolution(){
    if (showSolutionAnimationRef.current === false){
      const solutionPossible = sudokuBoardRef.current.solveBoard()
      showSolutionAnimationRef.current = true
      document.getElementById('stop-animation').style.visibility = "visible"
      const animationSteps = JSON.parse(JSON.stringify(sudokuBoardRef.current.animationSteps)).reverse()
      wrongLocationsRef.current = sudokuBoardRef.current.wrongLocations
      function sleep(time) { return new Promise((resolve) => setTimeout(resolve, time)); } //function to slow loop speed
      const incorrectElements = document.getElementsByClassName("incorrect")
      for (let i = 0; i < incorrectElements.length; i++){
        for (let counter = 0; counter <= animationSteps[i][0]; counter ++){
          try {
            await sleep(55)
            if (counter === animationSteps[i][0]){
              incorrectElements[i].style.backgroundColor = "rgb(145, 255, 147)"
            }
            incorrectElements[i].innerHTML = counter
          } catch {
            return
          }
        }
      }
    } 
  }

  function handleSkipAnimation(){ 
    document.getElementById('stop-animation').style.visibility = "hidden"
    setShowFinalBoard(true)
  }

  if (!inputString){
    return(
      <div className="absolute w-full top-1/3 flex justify-center">
        <InputSudokuBoard handleBoard={handleBoardSubmit}/>
      </div>
    )
  } else {
    return (
      <>
        <div>
        <Grid arr={sudokuBoardRef.current.board} />
        </div>
        <button onClick={generateSolution }>Solve board</button>
        <button id="stop-animation" style={{visibility:"hidden"}} onClick={handleSkipAnimation}>Skip</button>
      </>
    )
  }
}


const root = reactDOM.createRoot(document.getElementById("root"))
root.render(<Sudoku />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
