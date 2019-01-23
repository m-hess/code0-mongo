import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import * as Polls from './controllers/poll_controller';


// initialize
const app = express();

// DB Setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/cs52poll';
mongoose.connect(mongoURI);
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable only if you want templating
app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
app.use(express.static('static'));

// this just allows us to render ejs from the ../app/views directory
app.set('views', path.join(__dirname, '../src/views'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// // default index route
// app.get('/', (req, res) => {
//   res.send('hi');
// });

// //test index.ejs
// app.get('/', (req, res) => {
//   // we will later be able to get the polls by calling a function, but let's pass in no polls for now
//   const polls = [];
//   res.render('index', { polls });
// });

//GET / : Call Polls.getPolls and render index
app.get('/', (req, res)) => {
  Polls.getPolls().then((polls) => {
     res.render('index', { polls });
  }).catch((error) => {
     res.send(`error: ${error}`);
  });
}

// GET /new : Render the new page

//POST /new : Call Polls.createPoll()

// POST /vote/:id : Call Polls.vote() and return success (used to upvote or downvote)







// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
