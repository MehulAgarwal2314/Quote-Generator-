const express = require('express')
const app = express()
const quotesarr=require('./quotesSource.json');
const port = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors'); 
const functions = require('firebase-functions');

app.use(cors());

app.get('/', (req, res) => {
  const randomnumber = Math.floor(Math.random() * 16);
  const quoteitem = quotesarr[randomnumber];
  console.log(quoteitem);
  res.json(quoteitem);
});

exports.api = functions.https.onRequest(app);