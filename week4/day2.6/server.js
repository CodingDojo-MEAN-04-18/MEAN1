const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8000;
const { Schema } = mongoose;
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(parser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost/authors_books');
mongoose.connection.on('connected', () => console.log('Mongodb connected'));


const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  isAlive: {
    type: Boolean,
    required: true,
    default: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
}, {
  timestamps: true,
});

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  pages: {
    type: Number,
    required: true,
    min: 1,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }
}, {
  timestamps: true,
});

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);




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
  console.log('body', request.body);
  // const author = new Author(request.body);
  // author.save()

  Author.create(request.body)
    .then(author => {
      response.redirect('/authors');
    })
    .catch(console.log);

});


// books routes
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
  console.log('request', request.body);
  Book.create(request.body)
    .then(book => {
      return Author.findById(book.author)
        .then(author => {
          author.books.push(book);

          return author.save();
        })
        .then(() => {
          response.redirect('/books');
        });
    })
    .catch(console.log);
});


app.listen(port, () => console.log(`express server listening on port ${ port}`));
