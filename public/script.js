var submitButton = $("#submit-button");

$.get("/getvar", function (data) {
  contactService = data.contactService;
});

$.get("/getvar", function (data) {
  userID = data.userID;
});

submitButton.click(function (event) {
  event.preventDefault();
  emailjs
    .sendForm(contactService, "contact_form", "#contact-form", userID)
    .then(
      function () {
        console.log("SUCCESS!");
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
});
