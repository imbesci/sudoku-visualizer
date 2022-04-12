
export default function InputSudokuBoard(props) {

    return(
    <form onSubmit={props.handleBoard} className="inputform">
        <input className="inputstring" type="text" placeholder="Enter sudoku string" name="sudokustring"/>
      </form>
    )
}