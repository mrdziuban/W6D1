var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var ticTacToe = function () {
  var board = [["_","_","_"],["_","_","_"],["_","_","_"]];

  var gameOver = function () {
    return (vert() || horiz() || diag());
  };

  var vert = function(){
    for(var i = 0; i < 3; i++) {
      var xCounter = 0;
      var oCounter = 0;
      for(var j = 0; j < 3; j++) {
        if (board[j][i] === "x"){
          xCounter++;
        }
        else if (board[j][i] === "o") {
          oCounter++;
        }
      }
      if (xCounter === 3){
        return "x";
      }
      else if (oCounter === 3){
        return "o";
      }
      else {
        return false;
      }
    }
  };

  var horiz = function(){
    for (var row = 0; row < 3; row++){
      if (board[row][0] === board[row][1] && board[row][1] === board[row][2]){
        if (board[row][0] === "x" || board[row][0] === "o"){
          return board[row][0];
        }
      }
    }
    return false;
  };

  var diag = function(){
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]){
      if (board[0][0] === "x" || board[0][0] === "o"){
        return board[0][0];
      }
    }
    else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]){
      if (board[0][2] === "x" || board[0][2] === "o"){
        return board[0][2];
      }
    }
    return false;
  };

  var move = function(mark, coord) {
    if (board[coord[0]][coord[1]] === "_"){
      board[coord[0]][coord[1]] = mark;
    }
  };

  var makeMove = function(moveCallback) {
    reader.question("Enter your mark and coordinates (e.g. x 1,2)", function(answer){
      mark = answer.split(" ")[0];
      coord = answer.split(" ")[1].split(",");

      moveCallback(mark, coord)
    })
  };

  var gameLoop = function() {
    if (gameOver()){
      printBoard();
      console.log("Winner: " + gameOver());
    }
    else{
      printBoard();
      makeMove(function(mark, coord){
        move(mark, coord);
        gameLoop();
      })
    }
  };

  var printBoard = function() {
    for (var i = 0; i < board.length; i++) {
      console.log(board[i]);
    }
  };

  gameLoop();
};

ticTacToe();