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





app.listen(PORT, () => {
    console.log('Running at http://localhost:${PORT}');
});