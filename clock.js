function clock() {
  var currentTime = new Date();
  var timeToInc = 5000;
  console.log(currentTime.toString().slice(16,24));

  var incrementTime = function () {
    currentTime = new Date(currentTime.getTime() + timeToInc);
    console.log(currentTime.toString().slice(16,24));
  };

  setInterval(incrementTime, timeToInc);
}

clock();