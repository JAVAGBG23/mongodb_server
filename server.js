const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();

// express
const app = express();

// connect to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => console.log("**DB CONNECTED**"))
  .catch((err) => console.log("DB CONNECTION ERR => ", err));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// import routes
const authorRoutes = require("./routes/author");
const bookRoutes = require("./routes/book");

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// route middleware
app.use("/api/author", authorRoutes);
app.use("/api/books", bookRoutes);

app.get("/api/hello", (req, res) => {
  res.send("Hello :)");
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
