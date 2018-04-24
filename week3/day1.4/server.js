const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8000;
const app = express();

const names = [
  'Bob',
  'Sue',
  'Sam'
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(request, response) {
  console.log('routing root', request);

  response.render('index');
});

app.get('/names/:index', function(request, response) {

  console.log(request.params);
  response.send(names[request.params.index]);
});


app.post('/process', function(request, response) {
  console.log('posting', request.body);
  names.push(request.body.name);

  response.render('results', { name: request.body.name, names });

  // response.redirect('/');
});


app.listen(port, () => console.log(`Express server listening on port ${port}`));
//
