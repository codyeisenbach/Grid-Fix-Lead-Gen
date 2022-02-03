// var bnameInput = $("#business-name");
// var emailInput = $("#email");
// var passwordInput = $("#password");
// var passwordInput = $("#password");
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

// window.onload = function () {
//   $("contact-form").addEventListener("submit", function (event) {
//     event.preventDefault();
//     // generate a five digit number for the contact_number variable
//     this.contact_number.value = (Math.random() * 100000) | 0;
//     // these IDs from the previous steps
//     emailjs.sendForm("contact_service", "contact_form", this).then(
//       function () {
//         console.log("SUCCESS!");
//       },
//       function (error) {
//         console.log("FAILED...", error);
//       }
//     );
//   });
// };
