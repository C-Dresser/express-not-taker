const router = require('express').Router();
//const { v4: uuidv4 } = require('uuid');
const fs = require ('fs');


router.get('/api/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync('db/db.json'));
    res.json(dbJson);
  });

  module.exports = router;