const express = require('express');
const fs = require('fs/promises');
const path = require('path'); // Make sure to require 'path'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Root path
app.get('/', (req, res) => {
  res.send('Welcome to the Note Taker App!');
});

// Notes route
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// GET route
app.get('/api/notes', async (req, res) => {
  try {
    const data = await fs.readFile('db/db.json', 'utf8'); // Corrected path to db.json
    const notes = JSON.parse(data);
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// POST route
app.post('/api/notes', async (req, res) => {
  try {
    const data = await fs.readFile('db/db.json', 'utf8'); // Corrected path to db.json
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = Date.now();
    notes.push(newNote);
    await fs.writeFile('db/db.json', JSON.stringify(notes, null, 2)); // Corrected path to db.json
    res.json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// DELETE route
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const data = await fs.readFile('db/db.json', 'utf8'); // Corrected path to db.json
    let notes = JSON.parse(data);
    const noteId = parseInt(req.params.id);

    notes = notes.filter((note) => note.id !== noteId);

    await fs.writeFile('db/db.json', JSON.stringify(notes, null, 2)); // Corrected path to db.json
    res.send('Note deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
