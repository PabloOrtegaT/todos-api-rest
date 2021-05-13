const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const userRoutes = require('./routes/todos');

// settings
app.set('port', process.env.PORT || 3000);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rest-api-todos')
.then(db => console.log('db is connected'))
.catch(err => console.log(err));

// middleware
app.use(morgan('dev'));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// routes
app.use('/todos', userRoutes);

// static files

// error handlers

// start the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});