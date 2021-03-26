//express takes out a few lines of code for creating a server to listen for requests coming into a port (url)
//require it here after installing it with the NPM like this: npm install express
const express = require('express');
//express is a function that creates copies of itself you can name(from what I understand).
const app = express(); // app is a copy of express (I think)

//the following imports routes and their functions from a separate file specifically made for books,
//just to keep things neat.
const booksRoute = require('./js/routes/books');

// mongoose makes it easier to connect to mongoDB. Install it first with: npm install mongoose.
const mongoose = require('mongoose');

//dotenv is also something installed with npm
//it allows you to create .env files that can store variables you can access with "process.env." (see line 28)
//some of these variables might be environment specific like localhost or
//they can be api keys you shouldn't share along with the rest of the code in case you are pushing to a repo.
//therefore you will most likely add this in your gitignore file so you don't share it.
require('dotenv/config');

//I set these because the console told me to. Something about deprecated code... not important
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//connecting to database with the help of mongoose. process.env.DB_CONNECTION gives me the required connection string
// err will be passed by mongoose.connect if there is an error connecting
//I'll either log that error to the console or log my custom success message
mongoose.connect(process.env.DB_CONNECTION, (err) => {
  console.log(err || 'Connected to DB');
});

//app.use allows you to use "middleware" or functions on all or specific routes.
//in this case, the middleware is parsing the incoming data as urlencoded data.
//urlencoded data is url-safe string with special characters and spaces replaced
//you can also parse as json if receiving json
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//this middleware has a function defined inside that takes 3 parameters
//req is incoming request, res is the response you will send from here
//next passes the request to the next middleware or route
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//requests sent to localhost:3000/books will be forwarded to the booksRoute
app.use('/books', booksRoute);

//visiting localhost:3000 you will be sent the string 'hi'
app.get('/', (req, res) => {
  res.send('hi');
});

//Listen for request sent to the port stored in the PORT variable in .env
//also console logging a message to know what's happening
app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});
