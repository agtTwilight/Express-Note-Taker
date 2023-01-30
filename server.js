const express = require('express');
const app = express();
const PORT = 3000;
const data = require('./db/db.json')

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
        res.json(data);
})

// let index.js post to db
app.post('/api/notes', (req, res) => {
        // all this does is log something into json file on post
        res.json(`${req.body}`)
        console.log(req.body);
})

app.listen(PORT, function () {
        console.log(`Listening at http://localhost:${PORT}`)
});
