// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// var contactService = process.env.CONTACT_SERVICE;
// var userID = process.env.YOUR_USER_ID;

// function emailPost() {
//   emailjs
//     .sendForm(
//       process.env.CONTACT_SERVICE,
//       "contact_form",
//       "#contact-form",
//       process.env.YOUR_USER_ID
//     )
//     .then(
//       function () {
//         console.log("SUCCESS!");
//       },
//       function (error) {
//         console.log("FAILED...", error);
//       }
//     );
// }

// Routes
// =============================================================
app.use(express.static(__dirname + "/public"));

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
