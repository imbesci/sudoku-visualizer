
export default class SudokuSolver {
  constructor(board){
    this.board = board
  }

  validNum(stringNum){
    if (stringNum.length !== 1){ //make sure value is a whole number
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
        cleanedBoard.push(parseInt(uncleanedBoard[i]))
      }
    }
    if (cleanedBoard.length === 81){ 
      this.board = cleanedBoard //make sure board matches correct sudoku board length
      return true
    }
    return false
  }

  configureBoardArray(){
    let organizedBoard = [[],[],[],[],[],[],[],[],[]];  //array of 9 arrays
    for (let i = 0; i<this.board.length; i++){
      let targetArray = Math.floor(i/9);   //integer division by 9 to see what row its in
      organizedBoard[targetArray].push(this.board[i]);
    }
    this.board = organizedBoard;
    return true
  }

  validInRow(num, row, column){
    /* make sure number to add isn't already in the row*/
    for (let i=0; i<this.board[row].length; i++){
      if (num === this.board[row][i]) {
        return false
      } 
      return true
    }
  }

  validInColumn(num, row, column){
    /* make sure number to add isn't already in the column*/
    for (let i=0; i<this.board.length; i++){
      if (num === this.board[i][column]) {
        return false
      }
    }
    return true
  }

  validInCube(num, row, column){
    /* make sure number to add isn't already in the cube*/
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
    /* checks all three validate methods at once*/
    return this.validInRow(num, row, column) && this.validInColumn(num, row, column) && this.validInCube(num, row, column)
  }
  
  solveBoard(){
    for (let i = 0; i < this.board.length; i++){
      for (let j = 0; j < this.board.length; j++){
        if (this.board[i][j] === 0){
          for (let k = 1; k<10; k++){
            if (this.validPosition(k, i, j)){
              this.board[i][j] = k
              if (this.solveBoard()){
                return true
              } else {
                this.board[i][j] = 0
              }
            }
          } 
          return false
        }
      }
    } 
    return this.board
  }

  clean(){
    const validation = this.validBoardFormat()
    if (validation){
        return this.configureBoardArray()
    }
  }

  solve(){
    if (this.clean()){
        this.solveBoard()
        return this.board
    } else {
      console.log('Board error')
    }
  }

} //class close


