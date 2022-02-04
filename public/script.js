var submitButton = $("#submit-button");

// let emailPost = sendEmail();

// $.get("/", function (res) {
//   sendEmail();
// });

submitButton.click(function (event) {
  event.preventDefault();
  sendEmail();
});
