import TableItem from "./TableItem"


export default function RowComponent(props){
    const borderThickness = (props.data.row === 2 || props.data.row === 5) ? "border-slate-800 border-b-[5px]" : ""
    
    return(
        <tr className={borderThickness}>
            {
                props.rowval.map((item,ind) => (
                <TableItem key={ind} value={item} data={{row:props.data.row, col:ind}}/>
                ))
            }
        </tr>
    )
}