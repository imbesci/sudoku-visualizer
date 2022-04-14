
export default function InputSudokuBoard(props) {

    return(
    <form onSubmit={props.handleBoard} className="inputform">
        <input className="inputstring border-2 border-solid text-lg text-center rounded-md focus:outline-0 border-slate-200 bg-slate-200 h-10" type="text" placeholder="Enter sudoku string" name="sudokustring"/>
      </form>
    )
}