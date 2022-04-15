import React from 'react';
import {useState, useEffect, useRef} from 'react';
import reactDOM from 'react-dom/client';
import './index.css';
import SudokuSolver from './components/SudokuSolver';
import InputSudokuBoard from './components/InputSudokuBoard'
import Grid from './components/Grid';
import GridForm from './components/GridForm'
import HeaderComponent from './components/HeaderComponent';

// import reportWebVitals from './reportWebVitals';

function Sudoku(){
  document.title = "Sudoku Solver"

  const [inputString, setInputString] = useState({inputStringValue: null, showFinalBoard: false});
  const [showGridView, setShowGridView] = useState(false)


  let sudokuBoardRef = useRef()
  let sudokuBoardCopyRef = useRef(null)
  let showSolutionAnimationRef = useRef(false)
  let wrongLocationsRef = useRef(null) 

  useEffect(() => {
    if (inputString.showFinalBoard) {
      const boardElements = document.getElementsByClassName("table-cell")
      for (let i = 0; i < wrongLocationsRef.current.length; i++){
        boardElements[wrongLocationsRef.current[i]].style.backgroundColor = "rgb(145, 255, 147)"
      }
    }
  },[inputString.showFinalBoard])

  function verifyCleanBoard(input) {
    sudokuBoardRef.current = new SudokuSolver(input)
    if (sudokuBoardRef.current.clean()){
      sudokuBoardCopyRef.current = JSON.parse(JSON.stringify(sudokuBoardRef.current.board))
      setInputString({...inputString, inputStringValue:input })
    } else {
      return false
    }
  }

  function handleStringSubmit(e){
    e.preventDefault()
    const inputValue = e.target[0].value
    verifyCleanBoard(inputValue)
    e.target.reset()
  }

  async function generateSolution(){
    if (showSolutionAnimationRef.current === false){
      const solutionPossible = sudokuBoardRef.current.solveBoard()
      if (!solutionPossible){
        alert('This is an impossible board!')
        setInputString(null)
      }
      showSolutionAnimationRef.current = true
      document.getElementById('stop-animation').style.visibility = "visible"
      const animationSteps = JSON.parse(JSON.stringify(sudokuBoardRef.current.animationSteps)).reverse()
      wrongLocationsRef.current = sudokuBoardRef.current.wrongLocations
      function sleep(time) { return new Promise((resolve) => setTimeout(resolve, time)); } //function to slow loop speed
      const incorrectElements = document.getElementsByClassName("incorrect")
      for (let i = 0; i < incorrectElements.length; i++){
        for (let counter = 0; counter <= animationSteps[i][0]; counter ++){
          try {
            await sleep(50)
            if (counter === animationSteps[i][0]){
              incorrectElements[i].style.backgroundColor = "rgb(145, 255, 147)"
            }
            incorrectElements[i].innerHTML = counter
          } catch {
            return
          }
        }
      }
      document.getElementById('stop-animation').style.visibility = "hidden"
    } 
  }

  function handleGridViewClick(){
    setShowGridView(!showGridView)
  }

  function handleSkipAnimation(){ 
    document.getElementById('stop-animation').style.visibility = "hidden"
    setInputString({...inputString, showFinalBoard: true})
  }
  
  function handleDigitInput(e) {
    let value = e.target.value
    let element = document.getElementById(`${e.target.id}`);
    if (value === "0"){
      element.style.backgroundColor = "yellow"
    } else {
      element.style.backgroundColor = "rgb(241 245 249)"
    }
  }

  function handleGridSubmit(e) {
    e.preventDefault()
    console.log(e)
    let gridInputString = ''
    for (let i = 0; i < e.target.length; i++){
      gridInputString =  gridInputString + e.target[i].value
    }
    verifyCleanBoard(gridInputString)
    e.target.reset()
  }

  function handleReset() {
    showSolutionAnimationRef.current = false
    setInputString({inputStringValue: null, showFinalBoard: false})
  }
  
  if (!inputString.inputStringValue){
    return(
      <>
      <div className={showGridView? "absolute w-full top-24 overflow-hidden" : "absolute w-full top-1/3"}>
        {!showGridView && <InputSudokuBoard handleGridViewClick={handleGridViewClick} handleString={handleStringSubmit}/>}
        {showGridView && <GridForm gridSwitch={handleGridViewClick} handleGridSubmit={handleGridSubmit} handleDigitInput = {handleDigitInput} />}
      </div>
      </>
      )
  } else {
    return (
      <>

      <div className="absolute w-full top-24 grid grid-rows-1 grid-flow-col">
      <button className='absolute left-1/4  rounded-md px-6 py-1 m-0 bg-yellow-200' onClick={handleReset}>Back</button> 
        <div className="justify-self-center">
          <Grid arr={sudokuBoardRef.current.board} />
          <button className="mt-2.5 ml-10 mx-12 rounded-md px-12 py-1 m-0 bg-green-300" onClick={generateSolution}>Solve board</button>
          <button id="stop-animation" className="mt-2.5 ml-10 rounded-md px-16 py-1 m-0 bg-red-300" style={{visibility:"hidden"}} onClick={handleSkipAnimation}>Skip</button>
        </div>
      </div>
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
