const express = require('express');
const fs = require('fs/promises');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

//GET route
app.get('/api/notes', async (req, res) => {
    try {
        const data = await fs.readFile('db.json', 'utf8');
        const notes = JSON.parse(data);
        res.json(notes);
    }   catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

//POST route
app.post('/api/notes', async (req, res) => {
    try {
        const data = await fs.readFile('db.json', 'utf8');
        const notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = Date.now();
        notes.push(newNote);
        await fs.writeFile('db.json', JSON.stringify(notes, null, 2));
        res.json(newNote);
    }   catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});




app.listen(PORT, () => {
    console.log('Running at http://localhost:${PORT}');
});