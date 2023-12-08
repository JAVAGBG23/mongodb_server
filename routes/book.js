const express = require("express");
const router = express.Router();

// get the controller methods
const { create, listAllBooks, bookById, read } = require("../controllers/book");

// create a new book = http://localhost:8000/api/books/create
router.post("/create", create);

// get all books = http://localhost:8000/api/books/all
router.get("/all", listAllBooks);

// get single book = http://localhost:8000/api/books/12erg213fed2
router.get("/:bookId", read);

// bookId param
// we use the controller method to get the param id so we
// can use that as a dynamic id when we want to get a book
// based on the id
router.param("bookId", bookById);

module.exports = router;
