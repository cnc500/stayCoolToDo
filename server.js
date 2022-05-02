const express = require('express');
const path = require('path');
const fs = require('fs');
const data = require('./db/db.json');
const uuid = require('uuid');

// const PORT = 3001;
const PORT = process.env.PORT || 80;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// See index page at opening page
app.get("/",(req, res) => {
  res.sendFile(path.join(__dirname,"./public/index.html"))
})
// Working note taker page
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
  // Creates unique id forevery single note
  newNote.id = uuid.v4().toString();
  data.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(data));
  res.sendFile(path.join(__dirname,"./db/db.json"))
  console.log("Success");
}
)
  
// This listens to the port like a chime for both going in and out, and the connection to the port itself.
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
