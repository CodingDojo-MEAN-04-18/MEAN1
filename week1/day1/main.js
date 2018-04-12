var myStr;
var index;

myStr = 'some content';
myStr = 4;
// console.log(myStr);


const array = [1,2,3,45];

console.log(array.push('string'));

for (let index = 0; index < array.length; index++) {
  console.log(array[index]);
}

console.log('index outside loop', index);

// for (var index in array) {
//   console.log(array[index]);
// }

// for (var element of array) {
//     console.log(element);
// }

const obj = {
  first_name: 'Jason',
};

obj.last_name = 'F';

var age = 'age';

obj[age] = 7;

console.log(obj);

// for (var key in obj) {
//   console.log(obj[key]);
// }

function printValue(...rest) {
  var stuff = 'more stuff';
  console.log(`inside function `, array);
}



printValue('Jason', 'age', 'last name');

// console.log(stuff);


function counter() {
  var count = 0;
  // childScope();

  function childScope() {
    return ++count;
  }

  return childScope;
}


counter = counter();

console.log(counter());
// var zero = 0;
// var one = ++zero;
// console.log('zero', zero);
// console.log('one', one);
//

// console.log(childScope());

console.log(counter());
// => 1
console.log(counter());

// => 2
// counter()
// => 3
// counter()
// => 4


//
