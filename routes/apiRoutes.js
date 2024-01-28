const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ('fs');
var dbLocation = require('../db/db.json');

router.get('/api/notes', async (req, res) => {
   dbLocation = await JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
    res.json(dbLocation);
  });

router.post('/api/notes', (req, res) => {

    req.body.id = uuidv4()
    dbLocation.push(req.body);

    fs.writeFile('db/db.json', JSON.stringify(dbLocation), error => {
      if (error) {
        res.sendStatus(404)
    } else { res.sendStatus(200) }
    });
});

  module.exports = router;