const express = require('express');
const fs = require('fs/promises');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());



app.listen(PORT, () => {
    console.log('Running at http://localhost:${PORT}');
});