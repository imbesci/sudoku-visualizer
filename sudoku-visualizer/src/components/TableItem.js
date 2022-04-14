export default function TableItem(props){
    let tableValue = props.value

    
    if (props.value === 0){
        return(
            <td className="table-cell incorrect">
                {tableValue}
            </td>
        )
    }
    return(
        <td className="table-cell">
            {tableValue}
        </td>
    )
}