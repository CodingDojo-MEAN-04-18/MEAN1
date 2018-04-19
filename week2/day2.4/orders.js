function orderSupplies(item) {
  let warehouse; //undefined
  const deliveryTime = Math.random() * 3000;

  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      warehouse = {
        paint: {
          product: 'Neon Green Paint',
          directions: function() { return 'mix it!' }
        },
        brush: {
          product: 'Horsehair brush',
          directions: function() { return 'start painting!' }
        },
        tarp: {
          product: 'A large tarp',
          directions: function() { return 'cover the floor' }
        }
      };

      if (item in warehouse) {
        resolve(warehouse[item]);
      } else {
        reject(new Error(`Item ${item} is out of stock!`));
      }

    }, deliveryTime);
  });
}


function receivedItem(item) {
  console.log(`Received ${item.product}. Time to ${item.directions()}`);
}

const paint = orderSupplies('paint');
const brush = orderSupplies('brush');
const tarp = orderSupplies('tarp');
const roller = orderSupplies('roller').catch(handleError);

// Promise.all([tarp, paint, brush])
//   .then(function(items) {
//     items.forEach(receivedItem);
//   });

tarp
// handle tarp
  .then(function(item) {
    receivedItem(item);
    return paint;
  })
  // handle paint
  .then(function(item) {
    receivedItem(item);

    return brush;
  })
  // handle brush
  .then(brushFromWarehouse => {
    receivedItem(brushFromWarehouse);

    return roller;
  })
  // handle failure
  .catch(handleError);

function handleError(error) {
  console.log(error.message);
}

// solution #1
// orderSupplies('paint', function(item) {
//   receivedItem(item);
//
//   orderSupplies('brush', receivedItem);
// });

// solution #2
// let havePaint = false;
//
// orderSupplies('paint', function(item) {
//   receivedItem(item);
//
//   havePaint = true;
// });

// orderSupplies('brush', function(item) {
//   if (havePaint) {
//     receivedItem(item);
//   } else {
//     const timer = setInterval(function() {
//       console.log('...... checking for paint....');
//       if (havePaint) {
//         receivedItem(item);
//
//         clearInterval(timer);
//       }
//     }, 50);
//   }
// });

// orderSupplies('brush', checkPaint);
//
// function checkPaint(item) {
//   console.log('brush', item);
//   if (havePaint) {
//     return receivedItem(item);
//   }
//
//   console.log('...... checking for paint....');
//
//   setTimeout(checkPaint, 50, item);

// solution #3
// let havePaint = false;
// let haveBrush = false;
//
// orderSupplies('paint', function(item) {
//   console.log('got paint')
//
//   receivedItem(item);
//
//   if (haveBrush) {
//     return receivedItem(haveBrush);
//   }
//
//   havePaint = true;
// });
// orderSupplies('brush', function(item) {
//   console.log('got brush')
//   if (havePaint) {
//     return receivedItem(item);
//   }
//
//   haveBrush = item;
// });



// solution awesome
// const paint = new Promise(function(resolve, reject) {
//   orderSupplies('paint', resolve);
// });
//
// const brush = new Promise(function(resolve, reject) {
//   orderSupplies('brush', resolve);
// });
//
// paint
//   .then(function(item) {
//     // console.log('in promise then', item);
//     receivedItem(item);
//   })
//   .then(function() {
//     return brush
//   })
//   .then(function(item) {
//     receivedItem(item);
//   })
//   .catch(function() {});







//
