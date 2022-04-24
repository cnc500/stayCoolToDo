const express = require('express');
const path = require('path');
const fs = require('fs');

// const { clog } = require('./middleware/clog');
const api = require('./public/assets/js/index.js');
const notes = require('/db/notes');

const PORT = 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/api/notes', (req, res) =>
  res.status(200).json(notes)

//   res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes/:note_id', (req, res) => {
    if (req.params.note_id) {
      console.info(`${req.method} request received to get a single a review`);
      const noteId = req.params.note_id;
      console.log(noteId);
      for (let i = 0; i < notes.length; i++) {
        const currentNote = notes[i];
        if (currentNote.note_id === noteId) {
          res.json(currentNote);
          return;
        }
      }
      res.status(404).send('Note not found');
    } else {
      res.status(400).send('Note ID not provided');
    }
  });
  

app.post('/api/notes', (req, res) => 
    // Log that a POST request was received
    console.info(`${req.method} request received to add a new note`));
    const { title, text } = req.body;

      // If all the required properties are present
    if ( title && text ) {
    // Variable for the object we will save
        const newPost = { 
            title: title, 
            text: text
        };
    }

  

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
