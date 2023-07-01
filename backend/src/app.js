const express = require('express');
const router = require('./router');

const app = express();

// toda requisição será direcionada para o arquivo router.
app.use(router);


module.exports = app;