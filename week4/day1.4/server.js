const mongoose = require('mongoose');
const express = require('express');
const port = process.env.PORT || 8000;
const app = express();
mongoose.connect('mongodb://localhost/books');
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
//
const { Schema } = mongoose;
// const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A book title is required'],
    trim: true,
    minlength: [3, 'Book title length must be at least 3 chars'],
  },
  author: {
    type: String,
    default: 'Unknown',
  },
  pages: {
    type: Number,
    required: [true, 'You must supply a page count'],
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});
// collection => books
mongoose.model('Book', bookSchema);
const Book = mongoose.model('Book');

// console.log(Book);

const book = new Book({
  title: 'And',
  pages: 7
});
//
// book.save()
//   .then(book => {
//     console.log('saved book', book);
//   })
//   .catch(error => {
//     // if (error.errors.pages) {
//     //
//     // }
//     // console.log('failed to save', error.errors.pages.message);
//
//     const errors = Object
//                     .keys(error.errors)
//                     .map(key => error.errors[key].message);
//
//     // console.log(keys);
//
//     // for (let index = 0; index < keys.length; index++) {
//     //   errors.push(error.errors[keys[index]].message);
//     // }
//
//     console.log(errors);
//
//     // response.render('some_page', { errors })
//   });

  app.get('/', function(request, response) {
      // Book.find({}, function(error, books) {
      //   if (error) {
      //     throw error
      //   }
      //
      //   response.send(books);
      // });

      Book.find({})
      .then(books => {
        console.log(books);

        response.send(books);
      })
      .catch(console.log);
  });

// const o = {
//   a: 'this is a',
//   b: 'this is b',
// };
//
// // const a = o.a;
// // const b = o.b;
//
// const a = 'alt a';
//
// const { a: c, b } = o;
// // const { b } = o;
//
// console.log(a, b, c);
app.listen(port, () => console.log(`Express server listening  on port ${ port }`));
