import Grid from "./Grid";
import SudokuSolver from "./SudokuSolver";

export default function GridForm(props) {
    let inputArray = []
    for (let i = 0; i<81; i++) {
        let generateId = `input${i}`
        inputArray.push(<input id={generateId} onChange={props.handleDigitInput} maxLength="1" className="bg-slate-100 text-center border-0 text-3xl w-full h-full focus:outline-0" type='text'></input>)
    }

    let emptyBoard = new SudokuSolver(inputArray)
    emptyBoard.configureBoardArray()
    
    return(
        <>
        <button className="absolute z-50 left-1/4 rounded-md px-6 py-1 m-0 bg-yellow-200" onClick={props.gridSwitch}>Back</button> 
        <div className="grid grid-rows-1 grid-flow-col">
            <form onSubmit={props.handleGridSubmit} className="justify-self-center"> 
                <Grid arr={emptyBoard.board} />
                <label className="text-center text-xs text-white"><p className="mt-2.5">Use zeros in place of unknown numbers</p></label>
                <button type="submit" className="mx-44 mt-2.5 rounded-md px-12 py-1 m-0 bg-green-300">SUBMIT</button>
            </form>
        </div>
        </>
    )
}