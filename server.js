const express = require('express');
const path = require('path');
const fs = require('fs');
const data = require('./db/db.json');
// const { clog } = require('./middleware/clog');
// const api = require('./public/assets/js/index.js');
// const notes = require('/db/notes');

const PORT = 3001;

const app = express();

// Import custom middleware, "cLog"

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));


app.get("/",(req, res) => {
  res.sendFile(path.join(__dirname,"./public/index.html"))
})

app.get("/notes",(req, res) => {
  res.sendFile(path.join(__dirname,"./public/notes.html"))
})

// GET Route for homepage
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'))

}
);

app.post('/api/notes', (req, res) => {
  const newNote = req.body
  data.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(data));
  res.sendFile(path.join(__dirname,"./db/db.json"))
  console.log("Success");
}
)
  

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
