const mongoose = require('mongoose');
const express = require('express');
const port = process.env.PORT  || 8000;
const app = express();

mongoose.connect('mongodb://localhost/animals');
mongoose.connection.on('connected', () => console.log('Mongodb connected'));

const { Schema } = mongoose;
// const Schema = mongoose.Schema;

const animalSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required!!!'],
    minlength: [3, 'Name must be at least 3 chars']
  },
  age: {
    type: Number,
    required: [true, "Why no age?"],
  },
  eatsPeople: {
    type: Boolean,
    default: false,
  },
});

// creates collection => animals
mongoose.model('Animal', animalSchema);

// assume different file
const Animal = mongoose.model('Animal');

const animal = new Animal({
  name: 'Bob',
  age: 3
});

animal.save()
  .then(animal => {
    console.log('saved animal', animal);
  })
  .catch(error => {
    console.log('got an error', error.errors.name.message);

    const errors = Object.keys(error.errors).map(key => {
      return error.errors[key].message;
    });

    // console.log(keys);
    //
    // for (let index = 0; index < keys.length; index++) {
    //   errors.push(error.errors[keys[index]].message);
    // }

    console.log(errors);
    // if (error.errors.name)
  });

app.get('/', function(request, response) {
  Animal.find({})
    .then(animals => {
      response.send(animals);

      // response.render('animals', { animals });
    })
    .catch(console.log);
});


// const o = {
//   a: 'this is a',
//   b: 'this is b',
// };
//
// const a = 'alt a';
// // const c = o.a;
// const { a: c, b } = o;
// // const b = o.b;
// // const { b } = o;
//
// console.log(a, b, c);

app.listen(port, () => console.log(`express server listening on port ${ port}`));
