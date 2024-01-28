const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

//moved routes to their own js files

app.use(express.json());
app.use(express.static('public')); 
app.use(express.urlencoded({ extended:false }));
app.use(htmlRoutes);
app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
