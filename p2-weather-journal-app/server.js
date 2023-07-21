// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
  console.log(`running on localhost: ${port}`);
};

// GET route
app.get('/all', getInfo);

function getInfo (req, res) {
  res.send(projectData);
};

// POST route
app.post('/add', postInfo);

function postInfo(req, res) {
  console.log(`req:`, req);
  projectData['temp'] = req.body.temp;
  projectData['date'] = req.body.date;
  projectData['feel'] = req.body.feel;
  res.send(projectData);
  res.status(200).json({ message: 'Data received successfully!' });
}
