const mongoose = require('mongoose');
const express = require('express');
const parser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8000;
const app = express();
mongoose.connect('mongodb://localhost/booksz');
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(parser.urlencoded({ extended: true }));


//
const { Schema } = mongoose;
// const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isAlive: {
    type: Boolean,
    default: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
},
{
  timestamps: true,
});

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A book title is required'],
    trim: true,
    minlength: [3, 'Book title length must be at least 3 chars'],
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Author',
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
// collection => authors
const Author = mongoose.model('Author', authorSchema);

// console.log(Book);

// const book = new Book({
//   title: 'And',
//   pages: 7
// });
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
      response.render('index');
  });

  app.get('/authors', function(request, response) {
    Author.find({})
      .populate('books')
      .then(authors => {
        response.render('authors/index', { authors });
      })
      .catch(console.log);
  });

  app.get('/authors/new', function(request, response) {
    response.render('authors/new');
  });

  app.post('/authors', function(request, response) {
    console.log(request.body);

    Author.create(request.body)
      .then(author => {
        response.redirect('/authors');
      })
      .catch(console.log);
  });



  // book routes

  app.get('/books', function(request, response) {
    Book.find({})
      .populate('author')
      .then(books => {
        response.render('books/index', { books });
      })
      .catch(console.log);
  });

  app.get('/books/new', function(request, response) {
    Author.find({})
      .then(authors => {
        response.render('books/new', { authors });
      })
      .catch(console.log);
  });


  app.post('/books', function(request, response) {
    console.log(request.body);


    Book.create(request.body)
      .then(book => {
        console.log('created book', book);
        return Author.findById(book.author)
          .then(author => {
            console.log('author', author);
            author.books.push(book);

            return author.save();
          })
          .then(() => {
            console.log('redirecting');
            response.redirect('/books');
          });

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
