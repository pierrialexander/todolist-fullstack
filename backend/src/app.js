const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

// Nossa API saberá usar JSON
app.use(express.json());

// Liberando Cors para qualquer client se conectar a nossa API.
app.use(cors());

// toda requisição será direcionada para o arquivo router.
app.use(router);



module.exports = app;