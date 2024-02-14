const https = require('https');
const http = require('http');
const express = require('express');
const cors = require('cors');



require('./config/env');
require('./config/cloud');

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}));

const { port } = require('./config/variables');
const db = require('./config/db');
const collectionRouter = require('./routes/index');

app.use('/api/v1/collection',collectionRouter);

app.listen(port, async (error) => {
  console.log('server started... on port :', port);
  await db();
});