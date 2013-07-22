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
    for(var col = 0; col < 3; col++) {
      var xCounter = 0;
      var oCounter = 0;
      for(var row = 0; row < 3; row++) {
        if (board[row][col] === "x"){
          xCounter += 1;
        }
        else if (board[row][col] === "o") {
          oCounter += 1;
        }
      }
      if (xCounter === 3){
        return "x";
      }
      else if (oCounter === 3){
        return "o";
      }
    }
    return false;
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
      coord = answer.split(" ")[1];
      if (coord === "c") {
        coord = compChoice(mark)
      }
      else {
        coord = coord.split(",");
      }
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

  var compChoice = function(mark){
    avails = availMoves()
    for( var i = 0; i < avails.length; i++) {
      move(mark, avails[i]);
      if (gameOver()){
        undoMove(avails[i]);
        return avails[i];
      }
      undoMove(avails[i]);
    }
    return avails[Math.floor(Math.random() * avails.length)];
    // return avails[0];
  };

  var undoMove = function(coord){
    board[coord[0]][coord[1]] = "_";
  };

  var availMoves = function(){
    var moves = [];
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        if(board[row][col] === "_"){
          moves.push([row,col]);
        }
      }
    }
    return moves;
  };

  gameLoop();
};

ticTacToe();