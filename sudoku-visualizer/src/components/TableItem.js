
export default function TableItem(props){
    let checkForZero = props.value === 0
    let borderThickness = (props.data.col === 2 || props.data.col === 5) ? "border-slate-800 border-r-[5px]" : "border-slate-800 border-r-[1px]"
    if (checkForZero){
        borderThickness = borderThickness + ' incorrect'
    }
    
    
    return(
        <td className={"table-cell text-3xl h-14 w-14 text-center border-b-[1px] bg-slate-100 " + borderThickness} >
            {props.value}
        </td>
    )
}