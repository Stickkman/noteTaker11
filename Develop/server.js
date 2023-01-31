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

//HTML routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html'))); // '/notes' returns 'notes.html'
//API routes
app.get('/api/notes', (req, res) => {
    const rawNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf-8'); //reads db.json and sets contents to rawNotes 
    const parsedNotes = JSON.parse(rawNotes); res.json(parsedNotes); // parses rawNotes and sends response with that parsed data
});




// v-- placed as last route to prevent issues w running before other routes
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));      // fallback route to 'index.html'


    

