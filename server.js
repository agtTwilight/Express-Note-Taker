const generateUniqueId = require('generate-unique-id');
const express = require('express');
const fs = require('fs');
let noteData = require('./db/db.json')
const app = express();
const PORT = 3000;

// fix the request issue i had
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set file paths to .../public/... by default
app.use(express.static("public"));

// display landing page
app.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
})

// display notes html
app.get('/notes', (req, res) => {
        res.sendFile(__dirname + '/public/notes.html');
})

// display api
app.get('/api/notes', (req, res) => {
        res.json(noteData);
})

// let index.js post to db
app.post('/api/notes', (req, res) => {
        // TODO add content that tells the user what is happening on post requests
        // get the user input
        const {title, text} = req.body;

        // create new note w/ user note data & randomly generated ID
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
                        res.status(500).send("oh no!");
                        throw err;
                      } else {
                        res.send("data added!");
                      }
        })

})

// delete note
app.delete(`/api/notes/:id`, (req, res) => {
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
                        res.status(500).send("oh no!");
                        throw err;
                      } else {
                        res.send("data added!");
                      }
        })
})

// listen for when the local port is opened.
app.listen(PORT, function () {
        console.log(`Listening at http://localhost:${PORT}`)
});
