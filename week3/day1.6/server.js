
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8000;

const logger = require('./server/middleware/logger');


const app = express();

const names = ['Bob', 'Sam', 'Sue'];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

// app.use(function(request, response, next) {
//   console.log(new Date());
//
//   request.dateRequested = new Date();
//
//
//   next();
// });


function dateRequested({ getOnly = true, errorIf = false, body = false, ignore = false } = {}) {
  console.log(getOnly, errorIf, body, ignore);

  return function(request, response, next) {
    if (ignore) { return next(); }

    if (getOnly) {
      if (request.method !== 'GET') {
        let error = null;

        if (errorIf) {
          error = new Error(`The request method ${ request.method } is not supported`);
        }

        return next(error);
      }
    }

    if (body) {
      request.body.dateRequested = new Date();
    } else {
      request.dateRequested = new Date();
    }

    next();
  };
}



app.get('/', dateRequested({ errorIf: true }), function(request, response) {
  console.log('handling root', request.dateRequested);
  console.log('handling root body', request.body.dateRequested);
  response.render('index');
});

app.get('/names/:index', dateRequested({ ignore: true }), function(request, response) {
  // console.log(new Date());

  console.log(request.params);
  response.send(names[request.params.index]);
});

app.post('/process', [dateRequested({ body: true }), dateRequested({ getOnly: false })], function(request, response) {
  // console.log(new Date());
  console.log('processing', request.body);
  names.push(request.body.name);
  response.render('results', {
    email: request.body.email,
    name: request.body.name,
    names
  });

  // response.redirect('/');
});


app.use(function(error, request, response, next) {
  console.log('handling error');

  next(error);
});

app.use(function(error, request, response, next) {
  response.send(error.message);
});


app.listen(port, () => console.log(`Express server listening on port ${port}`));

//
