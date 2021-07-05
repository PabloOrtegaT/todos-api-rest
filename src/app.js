const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const appOrigin = process.env.APP_ORIGIN;
const userRoutes = require('./routes/users');

// settings
app.set('port', process.env.PORT || 5000);

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
app.use(cors());

// routes
app.use('/users', userRoutes);

// error handlers

// start the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
}); 