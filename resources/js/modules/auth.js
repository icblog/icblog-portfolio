import { handleCloseModal } from "../helper/functions";

// Auth back btn
$(".auth-back-btn").click(function () {
  $("#authModal .modal-title").text("Select option");
  $(this).parent().hide("fast");
  $(this).parent().parent().find("#auth-option-wrapper").show("slow");
});

// Trigger auth form
$(".auth-btn").click(function () {
  let authFormWrapper = $(this).data("dir"),
    authModalHeaderTitle = $("#authModal .modal-title"),
    timer = "",
    time = 300;
  $(this).parent().slideUp("fast");

  clearInterval(timer);
  timer = setTimeout(function () {
    switch (authFormWrapper) {
      case "auth-option-login-wrapper":
        authModalHeaderTitle.text("Login securely");
        $(`#${authFormWrapper}`).slideDown("slow");

        break;
      case "auth-option-forgotten-pass-wrapper":
        authModalHeaderTitle.text("Forgotton password?");
        $(`#${authFormWrapper}`).slideDown("slow");
        break;
      case "auth-option-register-wrapper":
        authModalHeaderTitle.text("Register");
        $(`#${authFormWrapper}`).slideDown("slow");
        break;
      default:
        authModalHeaderTitle.text("Select option");
        $(this).parent().slideDown("fast");
    }
  }, time); // timer before switch;
});

// Close modal
$(document).on("click", "#auth-modal-close-btn", function () {
  let authModal = $("#authModal");
  handleCloseModal(authModal, "", false, true, true);
});
