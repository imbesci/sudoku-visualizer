
export default function InputSudokuBoard(props) {

    return(
      <div className="grid grid-rows-2 grid-flow-col">
        <form onSubmit={props.handleBoard} className="w-11/12 justify-self-center">
          <input className="w-full border-2 border-solid text-2xl text-center rounded-md focus:outline-0 border-slate-200 bg-slate-100 h-12" type="text" placeholder="Enter sudoku string" readOnly={false} name="sudokustring"/>
          <button type="submit">submit</button>
        </form>
        <p className="justify-self-center text-xs mt-2.5 text-white">Enter numbers in a row or separated by a comma. Use zeros for unknown numbers.</p>
      </div>
    )
}