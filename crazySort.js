var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var crazyBubbleSort = function(arr, callback){
  var madeAnySwaps = true;

  var compare = function(el1, el2, callback){
    reader.question(el1 + " ? " + el2 + "\n", function(choice) {
      if (choice === ">") {
        callback(-1);
      } else {
        callback(1);
      }
    });
  };

  var performSortPass = function(arr, callback){
    console.log(arr);
    var i = 0;
    madeAnySwaps = false;
    function loopSort(){
      // Call callback to check whether any swaps were made while looping.
      if (i === arr.length - 1){
        callback();
        return;
      } else {
        compare(arr[i], arr[i+1], function(num){
          if (num === -1) {
            var tmp = arr[i];
            arr[i] = arr[i+1];
            arr[i+1] = tmp;

            // Used to indicate to callback that a swap was made.
            madeAnySwaps = true;
          }

          i += 1;
          loopSort();
        });
      }
    }

    loopSort();
  };

  performSortPass(arr, function(){
    // If any swaps were made, execute the whole thing again.
    if (madeAnySwaps) {
      crazyBubbleSort(arr, callback);
    }
    // Finished sorting, print final message and sorted array.
    else {
      callback(arr)
    }
  })
};


crazyBubbleSort([5,3,1,4], function(arr){
  console.log("YOU DID IT GUYS" + " [" + arr + "]");
});