import RowComponent from "./RowComponent";

export default function Grid(props){
    let sudokuArray = props.arr;
    return(
        <table className="border-4 border-zinc-700">
            <tbody>
                {
                    sudokuArray.map((row, ind)=> (
                        <RowComponent key={ind} rowval={row} data={{row:ind,}} />
                        )
                    )
                }
            </tbody>
        </table>
    )
}