import {
  returnLoaderSpinner,
  handleOutputInFo,
  handleErrorOnFocus,
} from "../helper/functions";
const handleSubmitWork = () => {
  $("#add-work-form").submit(function (e) {
    e.preventDefault();
    let addWorkFormWrapper = $("#add-work-form-wrapper"),
      errDiv = $(".err-div"),
      files = $("#add-work-form input[type=file]")[0],
      totalFiles = files.files.length,
      loader = returnLoaderSpinner(),
      errorElement = "",
      msg = "",
      timer = "",
      time = 1200;

    //hide validation error
    errDiv.slideUp("slow");

    //Ensure file is not empty and is not more than 10

    if (totalFiles <= 0) {
      errDiv
        .html(
          "<div class='no-border-radius alert alert-danger'><strong>Error!</strong> Please select at least one image file</div>"
        )
        .slideDown("fast");
      handleErrorOnFocus();
      return;
    }

    if (totalFiles > 10) {
      errDiv
        .html(
          "<div class='no-border-radius alert alert-danger'><strong>Error!</strong> Maximum 10 images please</div>"
        )
        .slideDown("fast");
      handleErrorOnFocus();
      return;
    }

    let formData = new FormData(this);

    for (let i = 0; i < totalFiles; i++) {
      formData.append("files" + i, files.files[i]);
    }
    formData.append("totalFiles", totalFiles);

    addWorkFormWrapper.append(loader);
    $("#add-work-form").slideUp("slow");

    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        url: routes.adminStore, //Blade Global veriable defined in the footer
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
          if ($.isEmptyObject(data.error)) {
            $(".success").remove();
            $(".loader").remove();
            msg = "Work uploaded sucessfully";
            errorElement = handleOutputInFo(msg, "success", false);
            $("#add-work-form").trigger("reset");
            addWorkFormWrapper.html(errorElement);
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            $("#add-work-form").slideDown("slow");
            msg = data.error;
            errorElement = handleOutputInFo(msg, "error", true);
            errDiv.html(errorElement).slideDown("slow");
          }
        },
      });
    }, time); // timer before action;
  });
};

const handleAdminImageHover = () => {
  //ON MOUSE OVER
  $(".admin-work-img").mouseover(function () {
    $(this).parent().find(".admin-work-img-delete-btn").css("display", "block");
    $(this).css("opacity", "0.5");
  });

  $(".admin-work-img-delete-btn").mouseover(function () {
    $(this).css("display", "block");
    $(this).parent().find(".admin-work-img").css("opacity", "0.5");
  });

  //ON MOUSE LEAVE

  $(".admin-work-img").mouseleave(function () {
    $(this).parent().find(".admin-work-img-delete-btn").css("display", "none");
    $(this).css("opacity", "1");
  });
};

const handleAdminDeleteWorkBtn = () => {
  $(".admin-work-img-delete-btn").click(function () {
    let btnClicked = $(this),
      workId = btnClicked.data("dir1"),
      publicId = btnClicked.data("dir2"),
      loader = returnLoaderSpinner(),
      errorElement = "",
      msg = "",
      timer = "",
      timer2 = "",
      time = 1200,
      time2 = 1700,
      deleteWorkFeedback = btnClicked.parent().find(".delete-work-feedback");

    if (window.confirm(`Delete this work? there is no go back`)) {
      deleteWorkFeedback.html(loader);
      btnClicked
        .parent()
        .find(".admin-work-img")
        .css("opacity", "0.2")
        .mouseover(function () {
          $(this).css("opacity", "0.2");
          btnClicked.css("display", "none");
        })
        .mouseleave(function () {
          $(this).css("opacity", "0.2");
          btnClicked.css("display", "none");
        });
      btnClicked.css("display", "none");
      //Send work img id and cloudinary publicId for deletion
      let dataTosend = { workId: workId, publicId: publicId };
      clearInterval(timer);
      timer = setTimeout(function () {
        $.ajax({
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          url: routes.adminDeleteWork, //Blade Global veriable defined in the footer
          data: dataTosend,
          success: function (data) {
            if (data.error == "") {
              msg = "Work deleted successful";
              errorElement = handleOutputInFo(msg, "success", false);
              deleteWorkFeedback
                .html(errorElement)
                .css({ left: "0", top: "15%" });
              clearInterval(timer2);
              timer2 = setTimeout(function () {
                deleteWorkFeedback.slideUp("slow");
                btnClicked.parent().remove();
              }, time2);
            } else {
              msg = data.error;
              errorElement = handleOutputInFo(msg, "error", true);
              deleteWorkFeedback
                .html(errorElement)
                .css({ left: "0", top: "15%" });
              timer2 = setTimeout(function () {
                deleteWorkFeedback.html("").css({ left: "35%", top: "35%" });
                btnClicked
                  .parent()
                  .find(".admin-work-img")
                  .css("opacity", "1")
                  .mouseover(function () {
                    $(this).css("opacity", "0.5");
                    btnClicked.css("display", "block");
                  })
                  .mouseleave(function () {
                    $(this).css("opacity", "1");
                    btnClicked.css("display", "none");
                  });
              }, 3500);
            }
          },
        });
      }, time); // timer before action;
    } else {
      btnClicked.css("display", "none");
      btnClicked.parent().find(".admin-work-img").css("opacity", "1");
    } //end if window confirm
  });
};

$(function () {
  $(".input-images").imageUploader({
    imagesInputName: "files",
    maxSize: 2 * 1024 * 1024,
    maxFiles: 10,
  });
  handleSubmitWork();
  handleAdminImageHover();
  handleAdminDeleteWorkBtn();
});
