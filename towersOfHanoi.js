var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var towersOfHanoi = function(numDiscs, callback){
  var towersArr = [[],[],[]];

  for (var i = 0; i < numDiscs; i++) {
    towersArr[0].push(i + 1);
  }

  var gameOver = function () {
    return towersArr[2].length === numDiscs;
  };

  var move = function(start, end) {
    if ((towersArr[end].length === 0) || (towersArr[start][0] < towersArr[end][0])) {
      towersArr[end].unshift(towersArr[start].shift());
    }
  };

  var getMove = function(callback) {
    console.log(towersArr);
    reader.question("Enter start and end towers, separated by comma (e.g. 1,2) ",
                     function(answer){
                       var moves = answer.split(",");
                       callback(moves[0],moves[1]);
                     });
  }

  var gameLoop = function() {
    if (gameOver()) {
      callback(towersArr);
    } else {
      getMove(function(start,end){
        move(start,end);
        gameLoop();
      })
    }
  };

  gameLoop();

};


// var towers = [[1,2,3],[],[]]

towersOfHanoi(4, function(towersArr) {
  console.log("YOU WON!");
  console.log(towersArr);
})