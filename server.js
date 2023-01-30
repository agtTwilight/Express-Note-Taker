const express = require('express');
const app = express();
const PORT = 3000;
const data = require('./db/db.json')

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

app.listen(PORT, function () {
        console.log(`Listening at http://localhost:${PORT}`)
});
