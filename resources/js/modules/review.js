import {
  returnLoaderSpinner,
  handleOutputInFo,
  handleErrorOnFocus,
} from "../helper/functions";
const handleReview = () => {
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

const checkUserReview = () => {
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

//========ADMIN REVIEW FUCNTIONS=========

const hideAndShowReplyForm = () => {
  $(".show-reply-form-btn").click(function () {
    $(this).hide("slow");
    $(this).parent().parent().find(".reply-form-wrapper").show("slow");
  });

  $(".close-reply-form-btn").click(function () {
    $(this).parent().parent().hide("slow");
    $(this)
      .parent()
      .parent()
      .parent()
      .find(".show-reply-form-btn")
      .show("slow");
  });
};

const handleReviewReplyForm = () => {
  $(".reply-form-btn").click(function (e) {
    e.preventDefault();
    let reviewReplyForm = $(this).parent().parent(),
      errDiv = $(this).parent().parent().parent().find(".err-div"),
      closeFormBtn = $(this)
        .parent()
        .parent()
        .parent()
        .find(".close-reply-form-btn"),
      takeActionBtn = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".show-reply-form-btn"),
      statusValue = $(this).parent().parent().find(".status").val(),
      formWrapper = $(this).parent().parent().parent(),
      formData = reviewReplyForm.serializeArray(),
      loader = returnLoaderSpinner(),
      errorElement = "",
      msg = "",
      timer = "",
      time = 2000;

    //hide validation error
    errDiv.slideUp("slow");

    //Validate form values
    if (statusValue == "") {
      msg = "Please select status";
      errorElement = handleOutputInFo(msg, "error", false);
      errDiv.html(errorElement).slideDown("slow");
      handleErrorOnFocus();
      return;
    }

    if ($(this).parent().parent().find(".comment").val() == "") {
      msg = "Please enter your reply";
      errorElement = handleOutputInFo(msg, "error", false);
      errDiv.html(errorElement).slideDown("slow");
      handleErrorOnFocus();
      return;
    }

    formWrapper.prepend(loader);
    reviewReplyForm.hide("slow");
    closeFormBtn.hide("slow");
    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        url: routes.storeReviewReply, //Blade Global veriable defined in the footer
        data: formData,
        success: function (data) {
          if ($.isEmptyObject(data.error)) {
            $(".loader").remove();

            msg = `You have sucessfully ${statusValue} the review`;
            errorElement = handleOutputInFo(msg, "success", true);
            reviewReplyForm.trigger("reset");
            formWrapper.html(errorElement);
            clearInterval(timer);
            timer = setTimeout(function () {
              formWrapper.slideUp("slow");
              takeActionBtn.show("slow");
              location.reload();
            }, time); // timer before action;
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            reviewReplyForm.slideDown("slow");
            closeFormBtn.show("slow");
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

$(function () {
  checkUserReview();
  handleReview();

  //ADMIN REVIEW
  $(".admin-review-stars").jsRapStar({
    length: 5,
    starHeight: 40,
    enabled: false,
  });
  hideAndShowReplyForm();
  handleReviewReplyForm();
});
