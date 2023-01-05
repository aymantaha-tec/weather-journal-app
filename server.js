// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// call express 
const app = express();
// data "object"===> from browser to server conver from object to ====> "json"
const bodyParser = require('body-parser'); 


/* Middleware*/
require('body-parser')

// Cors for cross origin allowance
// Permission for browser connection to the server
const cors = require('cors');
const { response, request } = require('express');
app.use(cors()); 


// Initialize the main project folder
// Server connection to my site
app.use(express.static('website'));


// Setup Server

const port = 8080;

const server = app.listen(port, listening);

function listening () {
    console.log(`server is Ranning
Runs on localhost:${port}`)
;}


//post data to server
const postData = (request, response) => {
    projectData = request.body;
    response.send(projectData);
    console.log(projectData);
}


app.post('/add', postData)



//Get Data from server 
const getData = (request, response) => {
    response.send(projectData)
}


app.get('/all', getData)