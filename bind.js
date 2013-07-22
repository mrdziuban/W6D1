Function.prototype.bond = function(object){
  var that = this;
  return function() { that.apply(object, arguments); };
};

// testing...

var cat = {
  age: 5,

  age_one_year: function (x) {
    this.age += x;
  }
};

function times(num, fun) {
  for (var i = 0; i < num; i++) {
    // call the function
    fun(2); // call is made "function-style"
  }
}

console.log(cat.age);

times(10, cat.age_one_year.bond(cat));

console.log(cat.age);