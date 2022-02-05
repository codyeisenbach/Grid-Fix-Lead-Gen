// Dependencies
// =============================================================
require("dotenv").config();
const nodemailer = require("nodemailer");
var express = require("express");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;

// Routes
// =============================================================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Node Mailer
// =============================================================

// Googleapis
const { google } = require("googleapis");
const { gmail } = require("googleapis/build/src/apis/gmail");

// Pull out OAuth2 from googleapis
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  // 1
  const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  console.log(process.env.OAUTH_CLIENT_ID);
  // 2
  oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :( " + err);
      }
      resolve(token);
    });
  });

  // 3
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SENDER_EMAIL,
      accessToken,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  // 4
  return transporter;
};

// app.post("/", (req, res) => {
//   if (error) {
//     console.log(err);
//     return res.send("Error uploading file");
//   } else {
//     const name = req.body.name;
//     const email = req.body.email;
//     console.log("name:", name);
//     console.log("email:", email);
//   }
// });

// Route to handle sending mails
// Post route to handle retrieving data from HTML form to server

// Route to handle sending mails
app.post("/", (req, res) => {
  (async (error) => {
    if (error) {
      return res.send("Error");
    } else {
      // Pulling out the form data from the request body
      const recipient = process.env.REC_EMAIL;
      const name = req.body.name;
      const email = req.body.email;
      const mailSubject = "Grid Fix Lead Gen";
      const mailBody = `Name: ${name} Email: ${email}`;

      // Mail options
      let mailOptions = {
        from: email,
        to: recipient,
        subject: mailSubject,
        text: mailBody,
      };

      try {
        // Get response from the createTransport
        let emailTransporter = await createTransporter();

        // Send email
        emailTransporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            // failed block
            console.log(error);
          } else {
            // Success block
            console.log("Email sent: " + info.response);
            return res.redirect("/");
          }
        });
      } catch (error) {
        return console.log(error);
      }
    }
  })();
});

// =============================================================

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
