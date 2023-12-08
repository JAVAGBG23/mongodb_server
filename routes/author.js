const express = require("express");
const router = express.Router();

// controllers
const { create } = require("../controllers/author");

// create a new author
router.post("/create", create);

module.exports = router;
