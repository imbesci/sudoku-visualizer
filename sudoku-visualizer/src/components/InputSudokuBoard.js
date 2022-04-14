
export default function InputSudokuBoard(props) {

    return(
      <div className="grid grid-rows-3 grid-flow-col">
        <form id="inputForm" onSubmit={props.handleString} className="w-11/12 justify-self-center">
          <input className="w-full border-2 border-solid text-2xl text-center rounded-md focus:outline-0 border-slate-200 bg-slate-100 h-12" type="text" placeholder="Enter sudoku string" readOnly={false} name="sudokustring"/>
        </form>
        <p className="justify-self-center text-xs mt-2.5 text-white">Enter numbers in a row or separated by a comma. Use zeros for unknown numbers.</p>
        <span className="justify-self-center ">
          <button className="rounded-md mx-3 px-8 py-1 m-0 bg-red-400" onClick={props.handleGridViewClick} >Grid View</button>
          <button type="submit" form="inputForm" className="rounded-md px-12 py-1 m-0 bg-green-300">Solve</button>
        </span>
      </div>
    )
}