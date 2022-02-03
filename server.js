// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Routes
// =============================================================
app.use(express.static(__dirname + "/public"));

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/getvar", function (req, res) {
  res.json({ contactService: process.env.CONTACT_SERVICE });
});

app.get("/getvar", function (req, res) {
  res.json({ userID: process.env.USER_ID });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
