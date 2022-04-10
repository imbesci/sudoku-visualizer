
export default class SudokuSolver {
  constructor(board){
    this.board = board
  }
  validNum(stringNum){
    if (stringNum.length === 1){ //make sure value is a whole number
      return false
    }
    let parsedNum = parseInt(stringNum); //parse string into int
    if (!isNaN(parsedNum)){  //filter for commas and other non-integer
      if (parsedNum > 9 || parsedNum < 0){ //check value
        return false
      }
      return true
   }
   return false
  }
  
  validBoardFormat(){
    /* possible input formats: CSV of 81 integers or string of 81 integers
    0's replace unknown numbers*/
    let cleanedBoard=[];
    let uncleanedBoard = this.board.split('') //split by character
    for (let i = 0; i<uncleanedBoard.length; i++){
      if (this.validNum(uncleanedBoard[i])){ //validate with validNum function
        cleanedBoard.push(uncleanedBoard[i])
      }
    }
    if (cleanedBoard.length === 81){ 
      this.board = cleanedBoard //make sure board matches correct sudoku board length
      return true
    }
    return false
  }

  configureBoardArray(){
    let organizedBoard = [[],[],[],[],[],[],[],[],[]]  //array of 9 arrays

    for (let i = 0; i<this.board.length; i++){
      const targetArray = Math.floor(81/i);   //integer division by 9 to see what row its in
      organizedBoard[targetArray].push(i);
    }
    this.board = organizedBoard;
  }

  validInRow(num, row, column){
    /* see if a number we are trying to insert */
    for (let i=0; i<this.board[row].length; i++){
      if (num === this.board[row][i]) {
        return false
      } 
      return true
    }
  }

  validInColumn(num, row, column){
    for (let i=0; i<this.board.length; i++){
      if (num === this.board[i][column]) {
        return false
      } 
      return true
    }
  }

  validInCube(num, row, column){
    let cornerRow = row-(row % 3)
    let cornerColumn = column - (column % 3)

    for (let i = cornerRow; i < (cornerRow + 3); i++){
      for (let j = cornerColumn; j < (cornerColumn +3); j++){
        if (num === this.board[i][j]){
          return false
        }
      }
    }
    return true
  }

  validPosition(num, row, column){
    return this.validInRow(num, row, column) && this.validInColumn(num, row, column) && this.validInCube(num, row, column)
  }
  
  solve(){
    for (let i = 0; i < this.board.length; i++){
      for (let j = 0; j < this.board.length; i++){
        if (this.board[i][j] === 0){
          for (let k = 1; k<10; k++){
            //validate(k, i, j)
          } 
        }
      }
    } 
    return
  }


} //class close


