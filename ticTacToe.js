var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var ticTacToe = function (endGameCallback) {
  var board = [[" "," "," "],[" "," "," "],[" "," "," "]];

  var gameOver = function () {
    if (availMoves().length === 0){
      return "CAT'S GAME";
    }
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
    if (board[coord[0]][coord[1]] === " "){
      board[coord[0]][coord[1]] = mark;
    }
  };

  var makeMove = function(currentPlayer, numPlayers, moveCallback) {
    if (currentPlayer === 1) {
      var mark = "x"
    }
    else {
      var mark = "o"
    }
    if (numPlayers === 1 && currentPlayer === -1) {
      console.log("Computer's turn...");
      var coord = compChoice(mark);
      moveCallback(mark, coord)
    }
    else {
      reader.question("Enter your coordinates (e.g. 1,2): ", function(answer){
        var coord = answer.split(",");
        moveCallback(mark, coord)
      })
    }
  };

  var setNumPlayers = function (numPlayersCallback) {
    reader.question("Enter number of human players: ", function(answer){
      var numPlayers = parseInt(answer);
      numPlayersCallback(numPlayers)
    })
  };

  var gameLoop = function(currentPlayer, numPlayers) {
    if (currentPlayer === 0){
      currentPlayer = 1;
    }
    if (typeof(numPlayers) === "undefined"){
      setNumPlayers(function(numPlayers){
        gameLoop(0, numPlayers);
      })
    }
    else if (gameOver()){
      printBoard();
      console.log("Winner: " + gameOver());
      endGameCallback();
    }
    else{
      printBoard();
      makeMove(currentPlayer, numPlayers, function(mark, coord){
        move(mark, coord);
        currentPlayer *= -1;
        gameLoop(currentPlayer, numPlayers);
      })
    }
  };

  var printBoard = function() {
    for (var i = 0; i < board.length; i++) {
      console.log(board[i].join(" | "));
      if (i !== 2){
        console.log("--|---|--");
      }
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
  };

  var undoMove = function(coord){
    board[coord[0]][coord[1]] = " ";
  };

  var availMoves = function(){
    var moves = [];
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        if(board[row][col] === " "){
          moves.push([row,col]);
        }
      }
    }
    return moves;
  };

  gameLoop(0);
};

var endGameCallback = function () {
  reader.question("Play again? ", function(answer){
    if (answer === "yes"){
      ticTacToe(endGameCallback);
    }
  })
};

ticTacToe(endGameCallback);