import {
  returnLoaderSpinner,
  handleOutputInFo,
  handleErrorOnFocus,
} from "../helper/functions";
const handleRview = () => {
  $("#user-star").val("");
  $(document).on("click", "#review-form-btn", function (e) {
    e.preventDefault();
    let reviewForm = $("#review-form"),
      errDiv = $(".err-div"),
      formWrapper = $(".form-wrapper"),
      formData = reviewForm.serializeArray(),
      loader = returnLoaderSpinner(),
      errorElement = "",
      msg = "",
      timer = "",
      validationRes = "",
      time = 1200;

    //hide validation error
    errDiv.slideUp("slow");

    //Validate form values
    if ($("#user-star").val() == "") {
      msg = "Please select a star";
      errorElement = handleOutputInFo(msg, "error", false);
      errDiv.html(errorElement).slideDown("slow");
      handleErrorOnFocus();
      return;
    }

    if ($("#comment").val() == "") {
      msg = "Please enter your comment";
      errorElement = handleOutputInFo(msg, "error", false);
      errDiv.html(errorElement).slideDown("slow");
      handleErrorOnFocus();
      return;
    }

    formWrapper.append(loader);
    $(".auth-back-btn").hide("slow");
    $(".form-top-text").hide("slow");
    reviewForm.hide("slow");

    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        url: routes.storeUserReview, //Blade Global veriable defined in the footer
        data: formData,
        success: function (data) {
          if ($.isEmptyObject(data.error)) {
            $(".loader").remove();

            msg = "Thanks for your review, it will appear on the site shortly.";
            errorElement = handleOutputInFo(msg, "success", false);
            reviewForm.trigger("reset");
            formWrapper.html(errorElement);
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            $(".form-top-text").show("slow");
            reviewForm.slideDown("slow");
            msg = data.error;
            errorElement = handleOutputInFo(msg, "error", true);
            errDiv.html(errorElement).slideDown("slow");

            handleErrorOnFocus();
          }
        },
      });
    }, time); // timer before action;
  });
};

const checkUserRview = () => {
  $(document).on("click", "#leave-review-btn", function () {
    $.ajax({
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      url: routes.checkUserReview, //Blade Global veriable defined in the footer
      data: {},
      success: function (res) {
        if ($.isEmptyObject(res.error)) {
          $("#review-action").val(res.action);
          //IF OLD REVIEW, POPULATE THE FORM
          if (res.action == "old-review") {
            $("#comment").val(res.data.comment);
            $("#review-stars").attr("value", res.data.star);
            $("#reviewId").attr("value", res.data.id);
            $("#user-star").val(res.data.star);
          } else {
            $("#review-stars").attr("value", 0);
          }

          //RUN STAR RATING PLUGIN
          $("#review-stars").jsRapStar({
            length: 5,
            step: false,
            starHeight: 54,
            onClick: function (score) {
              $(".err-div").slideUp("slow");
              $("#user-star").val(score.toFixed(2));
              //console.log($("#user-star").val());
            },
          });
        } else {
          let errorElement = handleOutputInFo(res.error, "error", true);
          $(".form-wrapper").html(errorElement);
        }
      },
    });
  });
};

$(function () {
  checkUserRview();
  handleRview();
});
