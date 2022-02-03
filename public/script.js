var submitButton = $("#submit-button");

$.get("/getvar", function (data) {
  contactService = data.contactService;
  return contactService;
});

$.get("/getvar", function (data) {
  userID = data.userID;
  return userID;
});

submitButton.click(function (event) {
  event.preventDefault();
  emailjs
    .sendForm(
      $.get("/getvar", function (data) {
        contactService = data.contactService;
        return contactService;
      }),
      "contact_form",
      "#contact-form",
      $.get("/getvar", function (data) {
        userID = data.userID;
        return userID;
      })
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
