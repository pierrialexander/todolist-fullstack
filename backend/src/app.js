const express = require('express');
const router = require('./router');

const app = express();

// Nossa API saberá usar JSON
app.use(express.json());

// toda requisição será direcionada para o arquivo router.
app.use(router);



module.exports = app;