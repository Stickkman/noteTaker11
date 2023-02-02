// server.js file
 
//import needed modules
             
const { v4: uuidv4 } = require('uuid');         // used for random unique id generation
const express = require('express');
const path = require('path');
const fs = require('fs');                       //read/write functionality
const datbase1 = require('./db/db.json');
const app = express();                          // instantiates/builds middleware for express assigned to app
const PORT = process.env.PORT || 3001;  

app.use(express.urlencoded({ extended: true})); // handles/parse incoming form data
app.use(express.json());                        // parse incoming json
app.use(express.static('public'));              // root dir for static files 

//HTML route
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html'))); // '/notes' returns 'notes.html'
//API route
app.get('/api/notes', (req, res) => {
    const rawNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf-8'); //reads db.json and sets contents to rawNotes 
    const parsedNotes = JSON.parse(rawNotes); res.json(parsedNotes); // parses rawNotes and sends json response 
});
// POST route
app.post('/api/notes', (req, res) => {
    const rawNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf-8');
    const parsedNotes = JSON.parse(rawNotes);
    req.body.id = uuidv4();                                         // inserts unique id into created 'id' property first
    parsedNotes.push(req.body);                                     // then add note data
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(parsedNotes), 'utf-8'); // writes note data to database                            
    res.json(`Note saved successfully!!! - Id: ${req.body.id}`);
    console.log(`Note saved successfully!!! - Id: ${req.body.id}`); // console log id and successful save
});
// Delete route by unique id
app.delete('/api/notes/:id', (req, res) => {
                            // backup method - filteredArray = filteredArray.filter(({ id }) => id !== req.params.id);
    console.log('-delete route accessed-');
    let noteToDelete = req.params.id;           // gets id of note to be deleted
    for (let i = 0; i < datbase1.length; i++) {
        if (noteToDelete === datbase1[i].id) {  
            datbase1.splice(i, 1);              // remove 1 element from datbase1[] at current position in loop according to if statment
            let strippedNote = JSON.stringify(datbase1, null, 2);  
            fs.writeFile('./db/db.json', strippedNote, function (error) {  //write back to db without deleted note
                if (error) throw error;
            console.log(`Note Id '${noteToDelete}' has been deleted!!!`);
            res.json(datbase1);
            }); 
       }
    } 
});

// fallback route to 'index.html'
// v-- placed as last route to prevent issues w running before other routes
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));      
    
// bind and listen for connections, also creates console link to localhost port for testing
app.listen(PORT, () =>  console.log(`Express Server listening @ http://localhost:${PORT}`));
