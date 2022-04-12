export default function TableItem(props){
    let tableValue = props.value
    let keygen =`${props.data.row}${props.data.col}`
    return(
        <td>
            {tableValue}
        </td>
    )
}