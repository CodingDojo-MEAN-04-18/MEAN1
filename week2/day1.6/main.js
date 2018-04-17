

function map(array, callback) {
  const results = [];

  for (let index = 0; index < array.length; index++) {
    results.push(callback(array[index], index));
  }

  return results;
}

const stringArray = ['99', 'cat', '234', 'dog'];

// console.log(
//   map(stringArray, element => parseInt(element))
// );

const numArray = [1,2,3,4,66,11,77];

// console.log(
//   map(numArray, (num1, num2) => num1 * num2)
// );

// const x = y => b => y * b;

function mult(num1, num2) {
  return num1 * num2;
}





// console.log('before');
//
// function sayHello(name) {
//   setTimeout(function() {
//     console.log(`Hello ${name}`);
//   }, 2000);
//
//   //continue
// }
//
// sayHello('Jason');
//
// console.log('after');

function getThingsFromDB(query, callback) {
  console.log(callback);
  return setTimeout(function() {
    const data = ['thing1', 'thing2'];
    callback(data);
    console.log('inside timeout');
  }, 500);
}


getThingsFromDB('select * from things;', function(things) {
  console.log('inside callback', things);

  console.log(map(things, (thing, index) => thing + index));
  
});

// console.log(things.data);


//
