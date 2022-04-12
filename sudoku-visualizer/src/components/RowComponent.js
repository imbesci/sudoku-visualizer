import TableItem from "./TableItem"
import { useRef } from "react"


export default function RowComponent(props){
    return(
        <tr key={props.tableRowKey}>
            {
                props.rowval.map((item,ind) => (
                <TableItem key={ind} value={item} data={{row:props.data.row, col:ind}}/>
                ))
            }
        </tr>
    )
}