const express = require('express');
let books = require("./booksdb.js");
const { resolve } = require('path');
const { rejects } = require('assert');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const { error } = require('console');
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
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: `${username} already exists! ` });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "Unable to register user." });

});

// Get the book list available in the shop
// public_users.get('/', function (req, res) {
//     //Write your code here

//     return res.status(300).json(books);
// });

async function getBooks() {
    let success = true;

    if (success) {
        return books; 
    } else {
        throw new Error("Failed to fetch books.");
    }
}

async function executeAsyncFunction() {
    try {
        const result = await getBooks();
        console.log(" From Async Callback", result);
    } catch (error) {
        console.error(error.message);
    }
}
executeAsyncFunction();

// Get book details based on ISBN
// public_users.get('/isbn/:isbn', function (req, res) {
//     //Write your code here
//     const isbn = req.params.isbn;
//     return res.status(300).json(books[isbn]);
// });


public_users.get('/isbn/:isbn', function (req, res) {

    const isbn = req.params.isbn;
    const getBookByIsbn = new Promise((resolve, reject) => {
        if (Object.keys(isbn).length > 0) {
            setTimeout(() => {
                resolve(books[isbn])
            }, 3000)
        } else {
            reject(`No book found with ${req.params.isbn}`)
        }
    });


    getBookByIsbn.then((data) => {
        console.log("From Callback", data)
    })


});


// Get book details based on author
// public_users.get('/author/:author', function (req, res) {
//     //Write your code here

//     const author = req.params.author;
//     const book = [];

//     Object.keys(books).forEach(key => {
//         if (books[key].author === author) {
//             book.push(books[key]);
//         }
//     });

//     if (book.length > 0) {

//         return res.status(300).json(book);
//     } else {
//         return res.status(404).json({ message: "No books found for this author" });
//     }
// });

public_users.get('/author/:author', function (req, res) {
    //Write your code here

    const author = req.params.author;
    const book = [];

    const searchByAuthor = new Promise((resolve, reject) => {
        Object.keys(books).forEach(key => {
            if (books[key].author === author) {
                book.push(books[key]);
            }
        });

        if (book.length > 0) {
            resolve(book);
        } else {
            reject("No books found with this author");
        }
    });

    searchByAuthor
        .then(data => {
            console.log("From Callback", data);
        })
        .catch(err => {
            console.log({ message: err });
        });
});


// Get all books based on title
// public_users.get('/title/:title', function (req, res) {
//     //Write your code here
//     const title = req.params.title;
//     const book = [];

//     Object.keys(books).forEach(key => {
//         if (books[key].title === title) {
//             book.push(books[key]);
//         }
//     });

//     if (book.length > 0) {
//         return res.status(300).json(book);
//     } else {
//         return res.status(404).json({ message: "No book found for this title" })
//     }

// });

//  Get book review
public_users.get('/title/:title', function (req, res) {
    //Write your code here

    const title = req.params.title;
    const book = [];

    const searchByTitle = new Promise((resolve, reject) => {
        Object.keys(books).forEach(key => {
            if (books[key].title === title) {
                book.push(books[key]);
            }
        });

        if (book.length > 0) {
            resolve(book);
        } else {
            reject("No books found with this title");
        }
    });

    searchByTitle
        .then(data => {
            console.log("From Callback", data);
        })
        .catch(err => {
            console.log({ message: err });
        });
});



public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(300).json(books[isbn].reviews);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }

});

module.exports.general = public_users;
