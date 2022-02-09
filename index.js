// Dependencies
// =============================================================
require("dotenv").config();
// const { JSDOM } = require("jsdom");
// const { window, document } = new JSDOM("");
// const $ = require("jquery")(window);
const nodemailer = require("nodemailer");
var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
var PORT = process.env.PORT || 3000;

// Dependencies
// =============================================================

// $(document).ready(function () {
//   resize_all_parallax();
// });

// /* resize the image(s) on page resize */
// $(window).on("resize", function () {
//   resize_all_parallax();
// });

// /* keep all of your resize function calls in one place so you don't have to edit them twice (on page load and resize) */
// function resize_all_parallax() {
//   var div_id = "img1"; /* the ID of the div that you're resizing */
//   var img_w = 1000; /* the width of your image, in pixels */
//   var img_h = 864; /* the height of your image, in pixels */
//   resize_parallax(div_id, img_w, img_h);
// }

// /* this resizes the parallax image down to an appropriate size for the viewport */
// function resize_parallax(div_id, img_w, img_h) {
//   var div = $("#" + div_id);
//   var divwidth = div.width();
//   if (divwidth < 769) {
//     var pct = (img_h / img_w) * 105;
//   } /* show full image, plus a little padding, if on static mobile view */ else {
//     var pct = 60;
//   } /* this is the HEIGHT as percentage of the current div WIDTH. you can change it to show more (or less) of your image */
//   var newheight = Math.round(divwidth * (pct / 100));
//   newheight = newheight + "px";
//   div.height(newheight);
// }

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
      const mailSubject = "Texas Grid Fix";
      const mailBody = `Name: ${name} Email: ${email}`;

      // Mail options
      let mailOptions = {
        from: process.env.SENDER_EMAIL,
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
