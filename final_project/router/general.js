const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const fs = require('fs').promises;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    // Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

const username = req.body.username;
const password = req.body.password;

// Check if both username and password are provided
if (username && password) {
    // Check if the user does not already exist
    if (!doesExist(username)) {
        // Add the new user to the users array
        users.push({"username": username, "password": password});
        return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
        return res.status(404).json({message:  `${username} already exists! `});
    }
}
// Return error if username or password is missing
return res.status(404).json({message: "Unable to register user."});
   
});

// Get the book list available in the shop

// Read the content of the file 'example.txt' with 'utf8' encoding
fs.readFile('booksdb.js', 'utf8')
  // Handle the resolved state of the promise
  .then((data) => { 
    // This block will execute if the file is read successfully
    console.log(data); // Print the file content to the console
  }) 
  // Handle the rejected state of the promise
  .catch((err) => { 
    // This block will execute if there is an error reading the file
    console.error('Error reading file:', err); // Print the error message to the console
  });


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    return res.status(300).json(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here

    const author = req.params.author;
    const book = [];

    Object.keys(books).forEach(key => {
        if (books[key].author === author) {
            book.push(books[key]);
        }
    });

    if (book.length > 0) {

        return res.status(300).json(book);
    } else {
        return res.status(404).json({ message: "No books found for this author" });
    }
});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const title = req.params.title;
    const book = [];

    Object.keys(books).forEach(key => {
        if (books[key].title === title) {
            book.push(books[key]);
        }
    });

    if (book.length > 0) {
        return res.status(300).json(book);
    } else{
        return res.status(404).json({message: "No book found for this title"})
    }

});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    
    if (books[isbn]){
        return res.status(300).json(books[isbn].reviews);
    }else {
        return res.status(404).json({ message: "Book not found" });
    }
   
});

module.exports.general = public_users;
