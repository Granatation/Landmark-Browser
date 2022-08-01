const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { PORT } = require('./config/env.js');
const { dbInit } = require('./config/db');
const router = require('./controllers/userController');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(router);

dbInit();
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))