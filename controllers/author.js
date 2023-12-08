const Author = require("../models/author");

// create a new author
// POST /api/author/create
exports.create = async (req, res) => {
  // req = request, what we send to the db
  // re = respone, what we get back after sending the request
  try {
    // we create a new author and save in db
    // the author info comes in the request body => request.body
    const author = await new Author({
      ...req.body,
    }).save();
    // we send the response as json, when we create and save somethin new
    // we dont have to send a response with the actual object.
    // normally we send a response of status 200 or 201
    // 200 = ok, 201 = created === thumbs up!
    res.json(author);
  } catch (err) {
    // if something goes wrong we catch the error...
    console.log(err);
    return res.status(400).send("Author creation failed");
  }
};
