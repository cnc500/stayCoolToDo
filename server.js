const express = require('express');
const path = require('path');
// const { clog } = require('./middleware/clog');
const api = require('./assets/js/index.js');

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

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
