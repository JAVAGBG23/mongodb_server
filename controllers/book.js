const Book = require("../models/book");

// create a new book
// POST /api/books/create
exports.create = async (req, res) => {
  // req = request, what we send to the db
  // re = respone, what we get back after sending the request
  try {
    // we create a new author and save in db
    // the author info comes in the request body => request.body
    const book = await new Book({
      ...req.body,
    }).save();
    res.json(book);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Book creation failed");
  }
};

// list all books
// GET /api/books/all
exports.listAllBooks = async (req, res) => {
  // we actually dont need the request here (req) but it's kinda defualt that you pass
  // both parameters anyway...
  // we dont need the request because this is a GET request which means we want some
  // data from the db, we dont want to send data to the db
  // in this example we get all books from our db and we populate our related fields
  // with only the name of author and coAuthor, we do not get all the other info
  const allBook = await Book.find({})
    .populate("author", "name")
    .populate("coAuthor", "name")
    .sort({ createdAt: 1 })
    .exec();
  // with the response we send all the books from our db
  res.json(allBook);
};

// get a single book based on id
// and get the param som we can use that in the route
// when we call the read function
exports.bookById = (req, res, next, id) => {
  // we also pass next and id, next => moves on to next
  // we pass id so we can find a book based on the id
  // we also populate our related fields with the name
  Book.findById(id)
    .populate("author", "name")
    .populate("coAuthor", "name")
    .exec((err, book) => {
      if (err || !book) {
        return res.status(400).json({
          error: "Book not found",
        });
      }
      // notice that we never send a response back
      // becuase this is just used to extract the param
      // the actual GET request functions is read() below
      req.book = book;
      next();
    });
};

// read book by id param
// GET /api/books/:bookId
exports.read = (req, res) => {
  return res.json(req.book);
};
