

function Person(name, items) {
  if (!(this instanceof Person)) {
    console.log('not an instance');
    return new Person(name, items);
  }

  // const person = { name };
  this.name = name;
  this.items = items;

  // this.take = take;



  // return person;
  // return this;
}

Person.prototype.take = function take(item, target) {
  if (!target || !Array.isArray(target.items)) {
    throw new Error('target does not have an items array');
  }

  // protect this code

  for (let index = 0; index < target.items.length; index++) {
    if (target.items[index] === item) {
      console.log('found item', item);
      // slice does not mutate array
      // splice
      // array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
      target.items.splice(index, 1);
      this.items.push(item);
      // jason.items.push(item);

      return true;
    }
  }

  return false;
};

Person.prototype.toString = function() {
  return this.name;
};

// function Parent() {}

// Person.prototype = Object.create(Parent.prototype)
// Person.prototype.constructor = Person;

// console.log('1' === 1);

const jason = new Person('Jason', ['wallet', 'gum', 'lint']);
const bob = Person('Bob', ['gold', 'rabbit', 'lettuce']);

const backpack = {
  items: ['map', 'compass', 'tent']
};
//
jason.take('gold', bob);
jason.take('compass', backpack);
bob.take('gum', jason);
console.log(jason);

jason.take.apply(backpack, ['compass', jason]);

// //

console.log(jason);
console.log(backpack);
// console.log(jason.name);
// // => Jason
//
// console.log(jason.items);
// // ['wallet', 'gum', 'lint']
