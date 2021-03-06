const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
var logger = require("morgan");
const favicon = require("serve-favicon");
var bodyParser = require("body-parser");
const connectHistoryApiFallback = require("connect-history-api-fallback");
const auth = require("./routes/auth");
const favorites = require("./routes/favorites");
const celebrities = require("./routes/celebrities");
const user = require("./routes/user");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// morgan, bodyparser, connectionHistory
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));

// app.use(
//   connectHistoryApiFallback({
//     verbose: false,
//   })
// );

app.use("/api/auth", auth);

app.use("/api/favorites", favorites);
app.use("/api/celebrities", celebrities);
app.use("/api/user", user);

// Define API routes here
app.get("/test", (req, res) => {
  res.send("test from server");
});

// Send every other request to the React app
// Define any API routes before this runs
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// app.get("*", (req, res) => {
//   let url = path.join(__dirname, "build", "index.html");
//   if (!url.startsWith("/app/"))

//     url = url.substring(1);
//   res.sendFile(url);
// });

// Handles any requests that don't match the ones above
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
// Mongodb connection
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://user:entertainme1@ds113732.mlab.com:13732/heroku_19r3pcv2",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("connected to mongodb");
  }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err });
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

module.exports = app;
