

function map(array, callback) {
  console.log(callback);
  const results = [];

  for (let index = 0; index < array.length; index++) {
    results.push(callback(array[index], index));
  }

  return results;
}

const stringArray = ['99', 'cat', '100', 'dog'];

// console.log(map(stringArray, element => parseInt(element, 10)));

// const numberArr = [999,14,2,23,4,5,56,677];

// console.log(map(numberArr, (num1, num2) => num1 + num2));

// function add(num1, num2) {
//   return num1 + num2;
// }



// console.log('above');
//
//
// function sayHello(name) {
//   setTimeout(function() {
//     console.log(`hello ${name}`);
//   }, 2000);
//
//   // continues
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
  }, 500);

}


getThingsFromDB('select * from things;', function(things) {
  console.log('inside callback', things);

  for (let index = 0; index < things.length; index++){
    console.log(things[index]);
  }
});


// console.log(things.data);


//
