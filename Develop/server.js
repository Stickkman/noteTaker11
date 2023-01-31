// server.js file

const express = require('express');
const path = require('path');
const fs = require('fs');
const database1 = require('./db/db.json');

const app = express();                          // instantiates/builds middleware for express assigned to app
const PORT = process.env.PORT || 3001;  

app.use(express.urlencoded({ extended: true})); // handles/parse incoming form data
app.use(express.json());                        // parse incoming json
app.use(express.static('public'));              // root dir for static files 
//<insert whatever i use for unique identifier here>



