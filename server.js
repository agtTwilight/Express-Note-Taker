const generateUniqueId = require('generate-unique-id');
const express = require('express');
const fs = require('fs');
let noteData = require('./db/db.json')
const app = express();
const PORT = process.env.PORT || 3000;

// Allows us to work with request data from index.js fetchs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set file paths to .../public/... as defualt in html files
app.use(express.static("public"));

// display notes html on /notes url
app.get('/notes', (req, res) => {
        res.sendFile(__dirname + '/public/notes.html');
})

// display api on /api/notes url
app.get('/api/notes', (req, res) => {
        res.json(noteData);
})

// let index.js post to db
app.post('/api/notes', (req, res) => {
        // get the user input and deconstruct the obj into two variables
        const {title, text} = req.body;

        // create new note w/ user note data & a randomly generated ID (func from npm package `generate-unique-id`)
        const newNote = {
                title,
                text,
                id: generateUniqueId(),
        }

        // add new note obj to existing db
        noteData.push(newNote);

        // update the db file
        fs.writeFile('./db/db.json', JSON.stringify(noteData), (err) => {
                if (err) {
                        res.status(500).send("unsuccessful updates!");
                        throw err;
                      } else {
                        res.send("data successfully added!");
                      }
        })

})

// delete a note
app.delete(`/api/notes/:id`, (req, res) => {
        // this will filter OUT any data that has an id equal to the req id
        noteData = noteData.filter((note) => {
                if (note.id == req.params.id) {
                        return false;
                } else {
                        return true
                }
        })

        // update the db file
        fs.writeFile('./db/db.json', JSON.stringify(noteData), (err) => {
                if (err) {
                        res.status(500).send("unsuccessful updates!");
                        throw err;
                      } else {
                        res.send("data successfully added!");
                      }
        })
})

// display landing page on all other url requests
app.get('*', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
})

// listen for when the local port is opened.
app.listen(PORT, function () {
        console.log(`Listening at http://localhost:${PORT}`)
});
