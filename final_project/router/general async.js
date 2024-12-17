const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Import the axios library

const axios = require('axios');

axios.get('https://gmqiti-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/')

  .then(response => {

    console.log(response.data);
  })
  .catch(error => {
    
    console.error('Error fetching data:', error);
  });

module.exports.general = public_users;
