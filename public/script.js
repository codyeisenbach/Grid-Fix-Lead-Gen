var submitButton = $("#submit-button");

submitButton.click(function (event) {
  event.preventDefault();
  emailjs
    .sendForm(
      process.env.CONTACT_SERVICE,
      "contact_form",
      "#contact-form",
      process.env.YOUR_USER_ID
    )
    .then(
      function () {
        console.log("SUCCESS!");
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
});
