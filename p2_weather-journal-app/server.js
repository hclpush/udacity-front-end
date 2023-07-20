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
const cors = require('cors'); // Explain: Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
  console.log(`running on localhost: ${port}`);
};

// GET route
app.get('/data', sendData);

function sendData (req, res) {
  res.send(projectData);
};

// POST route
/* copied from chatGPT */
// app.post('/data', (req, res) => {
//   const newData = req.body;
//   projectData.temperature = newData.temperature;
//   projectData.date = newData.date;
//   projectData.userResponse = newData.userResponse;
//   res.send(projectData);
// });

app.post('/addData', addZip);

function addZip(req,res){

  newEntry = {
    zip: req.body.zip,
    feel: req.body.feeling,
    temp: req.body.weather
  }
  projectData.push(newEntry)
  console.log(projectData)
};
