// server.js file
 
//import needed modules
             
const { v4: uuidv4 } = require('uuid');         // used for random unique id generation
const express = require('express');
const path = require('path');
const fs = require('fs');                       //read/write functionality
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
    const parsedNotes = JSON.parse(rawNotes); res.json(parsedNotes); // parses rawNotes and sends json response 
});


app.post('/api/notes', (req, res) => {
    const rawNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf-8');
    const parsedNotes = JSON.parse(rawNotes);
    req.body.id = uuidv4();                                         // inserts unique id into created 'id' property first
    parsedNotes.push(req.body);                                     // then add note data
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(parsedNotes), 'utf-8'); // writes note data to database                            
    res.json(`Note saved successfully!!! - Id: ${req.body.id}`);
    console.log(`Note saved successfully!!! - Id: ${req.body.id}`); // console log id and successful save
});



// v-- placed as last route to prevent issues w running before other routes
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));      // fallback route to 'index.html'


    
// bind and listen for connections, also creates console link to localhost port for testing
app.listen(PORT, () =>  console.log(`Express Server listening @ http://localhost:${PORT}`));
