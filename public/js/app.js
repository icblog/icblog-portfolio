/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./modules/header */ "./resources/js/modules/header.js");

__webpack_require__(/*! ./modules/contact */ "./resources/js/modules/contact.js");

__webpack_require__(/*! ./modules/about */ "./resources/js/modules/about.js");

__webpack_require__(/*! ./modules/register */ "./resources/js/modules/register.js");

__webpack_require__(/*! ./modules/forgotten-pwd */ "./resources/js/modules/forgotten-pwd.js");

__webpack_require__(/*! ./modules/reset-pwd */ "./resources/js/modules/reset-pwd.js");

__webpack_require__(/*! ./modules/login */ "./resources/js/modules/login.js");

__webpack_require__(/*! ./modules/verify */ "./resources/js/modules/verify.js");

__webpack_require__(/*! ./modules/logout */ "./resources/js/modules/logout.js");

__webpack_require__(/*! ./modules/util */ "./resources/js/modules/util.js"); //=========== BLOG ==========


__webpack_require__(/*! ./modules/blog/blog-sidebar */ "./resources/js/modules/blog/blog-sidebar.js"); //=========== ADMIN ==========


__webpack_require__(/*! ./modules/admin/category */ "./resources/js/modules/admin/category.js");

__webpack_require__(/*! ./modules/admin/post/add-post */ "./resources/js/modules/admin/post/add-post.js");

__webpack_require__(/*! ./modules/admin/post/all-post */ "./resources/js/modules/admin/post/all-post.js");

__webpack_require__(/*! ./modules/admin/post/edit-post */ "./resources/js/modules/admin/post/edit-post.js");

/***/ }),

/***/ "./resources/js/helper/functions.js":
/*!******************************************!*\
  !*** ./resources/js/helper/functions.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleAjaxPaginationInitialPageLoad": () => (/* binding */ handleAjaxPaginationInitialPageLoad),
/* harmony export */   "handleAjaxPaginationNextBtn": () => (/* binding */ handleAjaxPaginationNextBtn),
/* harmony export */   "handleAjaxPaginationPreviousBtn": () => (/* binding */ handleAjaxPaginationPreviousBtn),
/* harmony export */   "handleCategorySearchFilter": () => (/* binding */ handleCategorySearchFilter),
/* harmony export */   "handleCloseModal": () => (/* binding */ handleCloseModal),
/* harmony export */   "handleErrorOnFocus": () => (/* binding */ handleErrorOnFocus),
/* harmony export */   "handleOutputInFo": () => (/* binding */ handleOutputInFo),
/* harmony export */   "hideElement": () => (/* binding */ hideElement),
/* harmony export */   "inputTypeToggler": () => (/* binding */ inputTypeToggler),
/* harmony export */   "redirect": () => (/* binding */ redirect),
/* harmony export */   "redirectToHomePage": () => (/* binding */ redirectToHomePage),
/* harmony export */   "returnLoaderSpinner": () => (/* binding */ returnLoaderSpinner),
/* harmony export */   "returnPartOfUrl": () => (/* binding */ returnPartOfUrl),
/* harmony export */   "scrollToDiv": () => (/* binding */ scrollToDiv)
/* harmony export */ });
var returnBaseUrl = function returnBaseUrl() {
  return window.location.protocol + "//" + window.location.host + "/";
};

var isObject = function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

var isArray = function isArray(what) {
  return Object.prototype.toString.call(what) === '[object Array]';
};

var redirect = function redirect(url, external) {
  var ext = external || false;

  if (ext) {
    window.location = url;
  } else {
    window.location = returnBaseUrl() + url;
  }
};
var redirectToHomePage = function redirectToHomePage() {
  var homeUrl = returnBaseUrl();
  window.location = homeUrl;
};
var inputTypeToggler = function inputTypeToggler(handle, target, eventType, typeChange, changeIcon) {
  var targetType = $(target).prop("type");
  $(handle).on(eventType, function () {
    if ($(target).prop("type") !== typeChange) {
      $(target).prop("type", typeChange);

      if (changeIcon) {
        $(handle + " .fa").removeClass("fa-eye").addClass("fa-eye-slash");
      }
    } else {
      $(target).prop("type", targetType);

      if (changeIcon) {
        $(handle + " .fa").removeClass("fa-eye-slash").addClass("fa-eye");
      }
    }
  });
};
var returnPartOfUrl = function returnPartOfUrl(partNumber) {
  //This function return a part of the url string
  var url = $(location).attr("href").replace(/\/+$/, ""),
      //rtrim `/`
  parts = url.split("/"),
      urlpart = parts[parts.length - partNumber];
  return urlpart;
};
var handleOutputInFo = function handleOutputInFo(msg, type) {
  switch (type) {
    case "success":
      return '<div class="no-border-radius alert alert-success"><strong>Success! </strong>' + msg + "</div>";

    case "error":
      if (isObject(msg) || isArray(msg)) {
        var errElement = "<ul>";
        $.each(msg, function (key, value) {
          errElement += "<li>*" + value + "</li>";
        });
        errElement += "</ul>";
        return '<div class="no-border-radius alert alert-danger"><strong>Error! </strong>' + errElement + "</div>";
      } else {
        return '<div class="no-border-radius alert alert-danger"><strong>Error! </strong><ul><li>*' + msg + "</ul></li></div>";
      }

    case "info":
      return '<div class="no-border-radius alert alert-secondary"><strong>Info! </strong>' + msg + "</div>";

    default:
      return "";
  }
};
var handleErrorOnFocus = function handleErrorOnFocus() {
  var errDiv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "err-div";
  $("input").focus(function () {
    $(".".concat(errDiv)).slideUp("slow");
  });
  $("textarea").focus(function () {
    $(".".concat(errDiv)).slideUp("slow");
    $(".md-toolbar").removeClass("input-error");
    $(".md-editor").removeClass("input-error");
  });
  $("select").change(function () {
    $(".".concat(errDiv)).slideUp("slow");
  });
  $("input[type=file]").change(function () {
    $(".".concat(errDiv)).slideUp("slow");
  });
};
var returnLoaderSpinner = function returnLoaderSpinner() {
  return '<div class="loader text-align"><div class="fa-3x"><i class="fas fa-spinner fa-spin"></i></div><p>Please wait...</p></div>';
};
var handleCloseModal = function handleCloseModal(modalId) {
  var redirectLink = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var redirect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var refresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var isCustomBtn = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (isCustomBtn) {
    modalId.modal("hide");
  }

  if (redirect) {
    window.location = redirectLink;
    return;
  }

  if (refresh) {
    location.reload();
    return;
  }
};
var hideElement = function hideElement(timeTohide, elementToHide, speedToHideIt) {
  var timer = "";
  clearInterval(timer);
  timer = setTimeout(function () {
    elementToHide.slideUp(speedToHideIt);
  }, timeTohide);
};
var scrollToDiv = function scrollToDiv(divToScrollTo) {
  $('html, body').animate({
    scrollTop: divToScrollTo.offset().top
  }, 500);
};
var handleAjaxPaginationInitialPageLoad = function handleAjaxPaginationInitialPageLoad() {
  var intialPageNumber = $(".next-pre-btn-wrapper").data('dir1'),
      intialLastPageNumber = $(".next-pre-btn-wrapper").data('dir2'),
      preBtn = $(".pre-btn"),
      nextBtn = $(".next-btn");

  if (intialLastPageNumber <= intialPageNumber) {
    nextBtn.hide();
  } else {
    nextBtn.show();
  }

  preBtn.hide();
  return {
    "intialLastPageNumber": intialLastPageNumber,
    "intialPageNumber": intialPageNumber
  };
};
var handleAjaxPaginationNextBtn = function handleAjaxPaginationNextBtn(returnHtmlOutPut, ajaxEndPoint, intialPageNumber, intialLastPageNumber) {
  var pageNumber = $(".next-pre-btn-wrapper").data('dir1'),
      totalResultCount = $(".next-pre-btn-wrapper").data('dir3'),
      nextBtn = $(".next-btn"),
      preBtn = $(".pre-btn"),
      time = 600,
      timer = "",
      newPageNumber = pageNumber + 1; //hide both buttons

  nextBtn.hide();
  preBtn.hide(); //update page number in view

  $(".next-pre-btn-wrapper").data('dir1', newPageNumber); //make ajax call

  clearInterval(timer);
  timer = setTimeout(function () {
    var postData = {
      'pageNumber': newPageNumber,
      'totalResultCount': totalResultCount
    };
    $.ajax({
      url: ajaxEndPoint,
      type: 'POST',
      data: postData,
      success: function success(data) {
        if ($.isEmptyObject(data.error)) {
          if (intialLastPageNumber > intialPageNumber) {
            preBtn.show();
          }

          if (intialLastPageNumber != newPageNumber) {
            nextBtn.show();
          }

          var result = {
            "err": false,
            "res": data.res,
            "resultPerPage": data.resultPerPage
          };
          returnHtmlOutPut(result);
        } else {
          var _result = {
            "err": true,
            "res": data.error
          };
          returnHtmlOutPut(_result);
        } //end if error

      }
    }); //end ajax
  }, time); //end timer
}; //handleAjaxPaginationNextBtn

var handleAjaxPaginationPreviousBtn = function handleAjaxPaginationPreviousBtn(returnHtmlOutPut, ajaxEndPoint, intialPageNumber, intialLastPageNumber) {
  var pageNumber = $(".next-pre-btn-wrapper").data('dir1'),
      totalResultCount = $(".next-pre-btn-wrapper").data('dir3'),
      nextBtn = $(".next-btn"),
      preBtn = $(".pre-btn"),
      time = 600,
      timer = "",
      newPageNumber = pageNumber - 1; //hide both buttons

  nextBtn.hide();
  preBtn.hide(); //update page number in view

  $(".next-pre-btn-wrapper").data('dir1', newPageNumber); //make ajax call

  clearInterval(timer);
  timer = setTimeout(function () {
    var postData = {
      'pageNumber': newPageNumber,
      'totalResultCount': totalResultCount
    };
    $.ajax({
      url: ajaxEndPoint,
      type: 'POST',
      data: postData,
      success: function success(data) {
        if ($.isEmptyObject(data.error)) {
          preBtn.show();

          if (newPageNumber == intialPageNumber) {
            preBtn.hide();
          }

          if (intialLastPageNumber != newPageNumber) {
            nextBtn.show();
          }

          var result = {
            "err": false,
            "res": data.res,
            "resultPerPage": data.resultPerPage
          };
          returnHtmlOutPut(result);
        } else {
          var _result2 = {
            "err": true,
            "res": data.error
          };
          returnHtmlOutPut(_result2);
        } //end if error

      }
    }); //end ajax
  }, time); //end timer
}; //handleAjaxPaginationPreviousBtn

var handleCategorySearchFilter = function handleCategorySearchFilter(inputElement, categoryWrapper, clearBtn) {
  inputElement.keyup(function () {
    categoryWrapper.hide();
    var searchedWord = $(this).val().trim().toUpperCase().trim(); //Show clear button

    if (searchedWord == "") {
      clearBtn.hide();
    } else {
      clearBtn.show();
    } // Loop through all list items, and hide those who don't match the search query


    categoryWrapper.each(function () {
      if ($(this).text().toUpperCase().indexOf(searchedWord) != -1) {
        $(this).show();
      }
    });
  });
  clearBtn.click(function () {
    inputElement.val("");
    categoryWrapper.show();
    $(this).hide();
  });
};

/***/ }),

/***/ "./resources/js/helper/validations.js":
/*!********************************************!*\
  !*** ./resources/js/helper/validations.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateElementEmpty": () => (/* binding */ validateElementEmpty),
/* harmony export */   "validateEmail": () => (/* binding */ validateEmail)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./resources/js/helper/functions.js");
 //==============================================================================================//
//========================Validate Form Elements Helpers======================================//
//==============================================================================================//

function checkElementEmpty(elemId, message) {
  var elemValue = elemId.val().trim();

  if (elemValue === "") {
    return {
      outCome: false,
      errorDiv: (0,_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(message, "error", false)
    };
  } else {
    return {
      outCome: true
    };
  }
} //function checkEmpty ends


function checkFormat(elemId, message, format) {
  var elemValue = elemId.val().trim();

  if (elemValue !== "") {
    if (!format.test(elemValue)) {
      return {
        outCome: false,
        errorDiv: (0,_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(message, "error", false)
      };
    } else {
      return {
        outCome: true
      };
    }
  } // not empty

} //function checkFormat ends


function checkLenghtAnything(elemId, lenghtNumber, message) {
  var elemValue = elemId.val().trim();

  if (elemValue.length < lenghtNumber) {
    return {
      outCome: false,
      errorDiv: (0,_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(message, "error", false)
    };
  } else {
    return {
      outCome: true
    };
  }
} //function checkLenghtAnything


function checkEqualityAnything(elemId, elemId2, message) {
  var elemValue = elemId.val().trim();
  var elemValue2 = elemId2.val().trim();

  if (elemValue !== elemValue2) {
    return {
      outCome: false,
      errorDiv: (0,_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(message, "error", false)
    };
  } else {
    return {
      outCome: true
    };
  }
} // function checkEqualityAnything
//==============================================================================================//
//============================Validate Form Elements =============================================//
//==============================================================================================//


var validateEmail = function validateEmail(elemId) {
  var message = "*Email required",
      result = "",
      format = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  result = checkElementEmpty(elemId, message);

  if (!result.outCome) {
    return result.errorDiv;
  }

  message = "*Invalid email format";
  result = checkFormat(elemId, message, format);

  if (!result.outCome) {
    return result.errorDiv;
  }

  return true;
}; // function validateEmail ends

var validateElementEmpty = function validateElementEmpty(elemId, message) {
  var result = "";
  result = checkElementEmpty(elemId, message);

  if (!result.outCome) {
    return result.errorDiv;
  }

  return true;
}; // function validateElementEmpty ends

/***/ }),

/***/ "./resources/js/modules/about.js":
/*!***************************************!*\
  !*** ./resources/js/modules/about.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/functions */ "./resources/js/helper/functions.js");


var handleAboutTabContent = function handleAboutTabContent() {
  $(".tab_content").hide(); //$(".tab_content:first").show();

  /* if in tab mode */

  $(".about-h5-intro").click(function () {
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).removeClass("tab_content");
    $(".tab_content").hide();
    $("#" + activeTab).addClass("tab_content"); //Reset tab heading arror to default style

    $(".about-arrow-down").show();
    $(".about-arrow-up").hide(); //Hide and show up and down arrows

    if ($(this).hasClass("active")) {
      $(this).find(".about-arrow-up").hide();
      $(this).find(".about-arrow-down").show();
      $(".about-h5-intro").removeClass("active");
      $("#" + activeTab).slideUp("slow");
    } else {
      $(this).find(".about-arrow-up").show();
      $(this).find(".about-arrow-down").hide();
      $(".about-h5-intro").removeClass("active");
      $(this).addClass("active");
      $("#" + activeTab).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)($("#" + activeTab));
    }

    $(".tab_drawer_heading").removeClass("d_active");
    $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");
  });
  /* if in drawer mode */
  // $(".tab_drawer_heading").click(function () {
  //    $(".tab_content").hide();
  //    var d_activeTab = $(this).attr("rel");
  //    $("#" + d_activeTab).fadeIn();
  //    $(".tab_drawer_heading").removeClass("d_active");
  //    $(this).addClass("d_active");
  //    $("ul.tabs li").removeClass("active");
  //    $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
  // });
};

$(function () {
  handleAboutTabContent();
});

/***/ }),

/***/ "./resources/js/modules/admin/category.js":
/*!************************************************!*\
  !*** ./resources/js/modules/admin/category.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/functions */ "./resources/js/helper/functions.js");


var handleAddCategoryForm = function handleAddCategoryForm() {
  $(document).on("click", "#add-category-form-btn", function (e) {
    e.preventDefault();
    var addCategoryForm = $("#add-category-form"),
        errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        formData = $("#add-category-form").serializeArray(),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        categoryNameValue = $("#category-name").val(),
        infoElement = "",
        msg = "",
        timer = "",
        time = 1200; //hide validation error

    errDiv.slideUp("slow");

    if (categoryNameValue == "") {
      infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)("Category name required", "error");
      errDiv.html(infoElement).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    }

    formWrapper.prepend(loader);
    addCategoryForm.hide("slow");
    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json" // Authorization:
          //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NTE1NzU2NjksImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsIm5iZiI6MTY1MTU3NTY3OSwiZXhwIjoxNjUxNTc2MTY5LCJkYXRhIjp7ImVtYWlsIjoiZGRkZGRAZ21haWwuY29tIn19.zsPadnoglvaxGUwlkusKD6TlNCUEMhJKvxqKnOWds3K7-wPF9jilkzTuyCWjRe8P1bHyFLT5HJ0tNDWl72T0GQ",

        },
        url: routes.adminStoreCategory,
        //Blade Global veriable defined in the footer
        data: formData,
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            time = 1500;
            msg = "Category added successful, please wait...";
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success");
            addCategoryForm.trigger("reset");
            $(".loader").append(infoElement);
            clearInterval(timer);
            timer = setTimeout(function () {
              $(".success").remove();
              $(".loader").remove();
              addCategoryForm.hide("fast");
              location.reload();
            }, time);
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            addCategoryForm.slideDown("slow");
            msg = data.error;
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error");
            errDiv.html(infoElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          }
        }
      });
    }, time); // timer before action;
  });
};

var handleAdminCategoryEditAndCancelBtn = function handleAdminCategoryEditAndCancelBtn() {
  //Hide Save and Cancel btn on page load
  $(".save-category-btn").hide();
  $(".cancel-category-btn").hide();
  $(document).on("click", ".edit-category-btn", function () {
    var inputElement = $(this).parent().parent().find(".admin-all-category-input"),
        deleteCategoryBtn = $(this).parent().find(".delete-category-btn"),
        saveCategoryBtn = $(this).parent().find(".save-category-btn"),
        cancelCategoryBtn = $(this).parent().find(".cancel-category-btn"),
        defaultValue = inputElement.val();
    inputElement.prop("type", "text").focus().val("").val(defaultValue).addClass("admin-all-category-input-active");
    $(this).parent().parent().parent().addClass("admin-category-detail-wrapper-active");
    $(this).hide();
    deleteCategoryBtn.hide();
    saveCategoryBtn.show();
    cancelCategoryBtn.show();
  });
  $(document).on("click", ".cancel-category-btn", function () {
    var inputElement = $(this).parent().parent().find(".admin-all-category-input"),
        editCategoryBtn = $(this).parent().find(".edit-category-btn"),
        deleteCategoryBtn = $(this).parent().find(".delete-category-btn"),
        saveCategoryBtn = $(this).parent().find(".save-category-btn"),
        categoryErrDiv = $(this).parent().parent().parent().find(".category-err-div"),
        defaultValue = inputElement.data("dir");
    inputElement.prop("type", "button").val(defaultValue).removeClass("admin-all-category-input-active");
    $(this).parent().parent().parent().removeClass("admin-category-detail-wrapper-active");
    categoryErrDiv.slideUp("slow");
    $(this).hide();
    saveCategoryBtn.hide();
    deleteCategoryBtn.show();
    editCategoryBtn.show();
  });
};

var handleAdminCategorySaveBtn = function handleAdminCategorySaveBtn() {
  $(document).on("focus", ".admin-all-category-input", function () {
    $(this).parent().parent().find(".category-err-div").slideUp("slow");
  });
  $(document).on("click", ".save-category-btn", function () {
    var saveCategoryBtn = $(this),
        infoElement = "",
        inputElement = saveCategoryBtn.parent().parent().find(".admin-all-category-input"),
        categoryErrDiv = saveCategoryBtn.parent().parent().parent().find(".category-err-div"),
        categoryDetailUpdatedDatespan = saveCategoryBtn.parent().parent().parent().find(".admin-category-detail-updated-date-span"),
        categoryDetailUpdatedByspan = saveCategoryBtn.parent().parent().parent().find(".admin-category-detail-updated-by-span"),
        deleteCategoryBtn = saveCategoryBtn.parent().find(".delete-category-btn"),
        editCategoryBtn = saveCategoryBtn.parent().find(".edit-category-btn"),
        cancelCategoryBtn = saveCategoryBtn.parent().find(".cancel-category-btn"),
        defaultValue = inputElement.data("dir"),
        newValue = inputElement.val(),
        categoryId = inputElement.data("categoryid"),
        timer = "",
        time = 1200; //Check if new value is empty

    if (newValue == "") {
      infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)("Please fill in a value before saving", "error");
      categoryErrDiv.html(infoElement).slideDown("slow");
      return;
    } //Check if new value is same as old value


    if (newValue == defaultValue) {
      infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)("Please make changes before saving", "error");
      categoryErrDiv.html(infoElement).slideDown("slow");
      return;
    }

    cancelCategoryBtn.hide();
    saveCategoryBtn.text("Saving...."); //Make ajax call to update category

    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json" //Authorization: tokenData,

        },
        url: routes.adminUpdateCategory,
        //Blade Global veriable defined in the footer
        data: {
          categoryId: categoryId,
          newCategoryname: newValue,
          defaultValue: defaultValue
        },
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            time = 1500;
            saveCategoryBtn.text("Success");
            clearInterval(timer);
            timer = setTimeout(function () {
              inputElement.prop("type", "button").val(newValue).removeClass("admin-all-category-input-active");
              saveCategoryBtn.parent().parent().parent().removeClass("admin-category-detail-wrapper-active");
              inputElement.data('dir', newValue);
              categoryDetailUpdatedDatespan.text(data.updated_at);
              categoryDetailUpdatedByspan.text(data.updated_by);
              deleteCategoryBtn.show();
              editCategoryBtn.show();
              saveCategoryBtn.html('<span><i class="fas fa-check"></i></span>').hide();
            }, time); //timer
          } else {
            cancelCategoryBtn.show();
            saveCategoryBtn.html('<span><i class="fas fa-check"></i></span>'); //Show error

            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(data.error, "error");
            categoryErrDiv.html(infoElement).slideDown("slow");
          }
        }
      });
    }, time); // timer before ajax action;
  });
};

var handleAdminDeleteCategoryBtn = function handleAdminDeleteCategoryBtn() {
  $(document).on("click", ".delete-category-btn", function () {
    var deleteCategoryBtn = $(this),
        infoElement = "",
        inputElement = deleteCategoryBtn.parent().parent().find(".admin-all-category-input"),
        categoryErrDiv = deleteCategoryBtn.parent().parent().parent().find(".category-err-div"),
        editCategoryBtn = deleteCategoryBtn.parent().find(".edit-category-btn"),
        defaultValue = inputElement.data("dir"),
        categoryId = inputElement.data("categoryid"),
        resultPerPage = $(".next-pre-btn-wrapper").data("resultperpage"),
        timer = "",
        time = 1200;
    categoryErrDiv.slideUp("slow");

    if (window.confirm("Delete category (".concat(defaultValue, ") ? please note this can not be undone"))) {
      editCategoryBtn.hide();
      deleteCategoryBtn.text("Deleting...."); //Make ajax call to update category

      clearInterval(timer);
      timer = setTimeout(function () {
        $.ajax({
          method: "POST",
          headers: {
            Accept: "application/json" //Authorization: tokenData,

          },
          url: routes.adminDeleteCategory,
          //Blade Global veriable defined in the footer
          data: {
            categoryId: categoryId
          },
          success: function success(data) {
            if ($.isEmptyObject(data.error)) {
              time = 1500;
              deleteCategoryBtn.removeClass("btn-danger").addClass("btn-success").text("Success");
              clearInterval(timer);
              timer = setTimeout(function () {
                deleteCategoryBtn.parent().parent().parent().remove(); //Check how many result left on the page and if is zero reload the page for ne records

                var newResultPerPageValue = resultPerPage - 1; // console.log(newResultPerPageValue);

                if (newResultPerPageValue == 0) {
                  location.reload();
                } else {
                  //update resultPerPage value
                  $(".next-pre-btn-wrapper").data("resultperpage", newResultPerPageValue);
                }
              }, time); //timer
            } else {
              editCategoryBtn.show();
              deleteCategoryBtn.removeClass("btn-success").addClass("btn-danger").html('<span><i class="fas fa-trash"></i></span>'); //Show error

              infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(data.error, "error");
              categoryErrDiv.html(infoElement).slideDown("slow");
            }
          }
        });
      }, time); // timer before ajax action;
    } //End window confirmation

  });
};

var returnHtmlOutPut = function returnHtmlOutPut(result) {
  var htmloutput = "",
      categoriesWrapperDiv = $("#admin-all-category-wrapper");

  if (result.err) {
    categoriesWrapperDiv.html("<p>" + result.res + "</p>");
    return;
  }

  if (result.res.length > 0) {
    $.each(result.res, function (key, value) {
      htmloutput += '<div class="admin-category-detail-wrapper p-2 box-shadow mb-4">';
      htmloutput += '<div class="input-group">';
      htmloutput += "<input type=\"button\" class=\"form-control admin-all-category-input\" value=\"".concat(value.name, "\" data-dir=\"").concat(value.name, "\" data-categoryid=\"").concat(value.id, "\">");
      htmloutput += '<div class="input-group-append">';
      htmloutput += '<button class="btn btn-primary edit-category-btn" type="button"><span><i class="fas fa-edit"></i></span></button>';
      htmloutput += '<button class="btn btn-danger delete-category-btn" type="button"><span><i class="fas fa-trash"></i></span></button>';
      htmloutput += '<button class="btn btn-success save-category-btn" type="button"><span><i class="fas fa-check"></i></span></button>';
      htmloutput += '<button class="btn btn-warning cancel-category-btn" type="button"><span><i class="fas fa-times"></i></span></button>';
      htmloutput += '</div>';
      htmloutput += '</div>';
      htmloutput += '<div class="category-err-div"></div>';
      htmloutput += "<p>\n            Created date: <span class=\"admin-detail-value-span\">".concat(value.created_at, "</span><br/> \n            Created by: <span class=\"admin-detail-value-span\">").concat(value.createdby_name, "</span><br/>\n            Updated date: <span class=\"admin-detail-value-span\">").concat(value.updated_at == value.created_at ? "--" : value.updated_at, "</span><br/>\n            Updated by: <span class=\"admin-detail-value-span\">").concat(value.updatedby_name == null ? "--" : value.updatedby_name, "</span><br/>\n            </p>");
      htmloutput += '</div>';
    });
  } else {
    htmloutput += '<p class="text-center">There is currently no category, please add one using the form above thank you.</p>';
  }

  categoriesWrapperDiv.html(htmloutput);
  $(".next-pre-btn-wrapper").data("resultperpage", result.resultPerPage);
  $(".save-category-btn").hide();
  $(".cancel-category-btn").hide();
};

var handleCategoryPagination = function handleCategoryPagination() {
  var initialPageLoadObject = "",
      output = "",
      intialPageNumber = "",
      intialLastPageNumber = "",
      categoriesWrapperDiv = $("#admin-all-category-wrapper"),
      loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
      ajaxEndPoint = routes.adminLoadmoreCategory;
  initialPageLoadObject = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleAjaxPaginationInitialPageLoad)();
  intialPageNumber = initialPageLoadObject.intialPageNumber;
  intialLastPageNumber = initialPageLoadObject.intialLastPageNumber;
  $(".next-btn").click(function () {
    categoriesWrapperDiv.html(loader);
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)($(".form-wrapper"));
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleAjaxPaginationNextBtn)(returnHtmlOutPut, ajaxEndPoint, intialPageNumber, intialLastPageNumber);
  });
  $(".pre-btn").click(function () {
    categoriesWrapperDiv.html(loader);
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)($(".form-wrapper"));
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleAjaxPaginationPreviousBtn)(returnHtmlOutPut, ajaxEndPoint, intialPageNumber, intialLastPageNumber);
  });
};

$(function () {
  //Run this code only on category page
  var page = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(1);

  if (page == "category") {
    //Run above function to handle the form
    handleAddCategoryForm();
    handleAdminCategoryEditAndCancelBtn();
    handleAdminCategorySaveBtn();
    handleAdminDeleteCategoryBtn();
    handleCategoryPagination();
  }
});

/***/ }),

/***/ "./resources/js/modules/admin/post/add-post.js":
/*!*****************************************************!*\
  !*** ./resources/js/modules/admin/post/add-post.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helper/functions */ "./resources/js/helper/functions.js");


var handleAddPostForm = function handleAddPostForm() {
  var addPostForm = $("#add-post-form"); //Reset form on page load

  addPostForm.trigger("reset");
  addPostForm.submit(function (e) {
    e.preventDefault();
    var errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        formData = new FormData(this),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        title = $("#title"),
        files = $("#add-post-form input[type=file]")[0],
        totalFiles = files.files.length,
        selectedCategories = $("#admin-post-category-select"),
        postBody = $("#postbody"),
        infoElement = "",
        msg = "",
        timer = "",
        time = 1200; //hide validation error

    errDiv.slideUp("slow"); //Image file is optional, only validate if user attempt to upload

    if (totalFiles > 0) {
      //Maximum number of files allowed is 10
      if (totalFiles > 10) {
        infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)("Maximum 10 images please thank you", "error");
        errDiv.html(infoElement).slideDown("slow");
        (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(formWrapper);
        (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
        return;
      } else {
        //Add images files to form data
        for (var i = 0; i < totalFiles; i++) {
          formData.append("files" + i, files.files[i]);
        }

        formData.append("totalFiles", totalFiles);
      }
    } //End if image is greater than 0


    if (title.val().trim() == "") {
      infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)("Post title required", "error");
      title.addClass("input-error");
      errDiv.html(infoElement).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(formWrapper);
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    } else {
      title.removeClass("input-error");
    }

    if (selectedCategories.get(0).selectedIndex == -1) {
      infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)("Please select at least on category", "error");
      $(".easySelect").addClass("input-error");
      errDiv.html(infoElement).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(formWrapper);
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    } else {
      $(".easySelect").removeClass("input-error");
    }

    if (postBody.val().trim() == "") {
      infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)("Post body required", "error");
      $(".md-toolbar").addClass("input-error");
      $(".md-editor").addClass("input-error");
      errDiv.html(infoElement).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(formWrapper);
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    } else {
      $(".md-toolbar").removeClass("input-error");
      $(".md-editor").removeClass("input-error");
    }

    if ($('input[name="saveorpublish"]:checked').length == 0) {
      infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)("Select either to save or published post", "error");
      errDiv.html(infoElement).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(formWrapper);
      $(".saveorpublish").addClass("input-error");
      return;
    } else {
      $(".saveorpublish").removeClass("input-error");
    }

    formWrapper.prepend(loader);
    addPostForm.hide("slow");
    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json" // Authorization:
          //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NTE1NzU2NjksImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsIm5iZiI6MTY1MTU3NTY3OSwiZXhwIjoxNjUxNTc2MTY5LCJkYXRhIjp7ImVtYWlsIjoiZGRkZGRAZ21haWwuY29tIn19.zsPadnoglvaxGUwlkusKD6TlNCUEMhJKvxqKnOWds3K7-wPF9jilkzTuyCWjRe8P1bHyFLT5HJ0tNDWl72T0GQ",

        },
        url: routes.adminStorepost,
        //Blade Global veriable defined in the footer
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            time = 1500;
            msg = "Post created successful, please wait...";
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success");
            addPostForm.trigger("reset");
            $(".loader").append(infoElement);
            clearInterval(timer);
            timer = setTimeout(function () {
              $(".success").remove();
              $(".loader").remove();
              addPostForm.hide("fast"); //location.reload();

              (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)("admin/allpost", false);
            }, time);
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            addPostForm.slideDown("slow");
            msg = data.error;
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error");
            errDiv.html(infoElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(formWrapper);
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          }
        }
      });
    }, time); // timer before action;
  }); //Category multiselect on click
  //Hide errors

  $(".styledSelect").click(function () {
    $(".easySelect").removeClass("input-error");
    $(".err-div").slideUp("slow");
  }); //Radio button checked
  //Hide error

  $('input[name="saveorpublish"]').focus(function () {
    $(".saveorpublish").removeClass("input-error");
  });
};

$(function () {
  var page = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(1); //If page is addpost

  if (page == "addpost") {
    $(".add-post-input-images").imageUploader({
      imagesInputName: "files",
      maxSize: 2 * 1024 * 1024,
      maxFiles: 10
    });
    $("#admin-post-category-select").easySelect({
      buttons: true,
      // 
      search: true,
      placeholder: 'Choose category',
      placeholderColor: '#524781',
      selectColor: '#524781',
      itemTitle: 'categories selected',
      showEachItem: true,
      width: '100%',
      dropdownMaxHeight: '450px'
    });
    $('#postbody').markdownEditor({
      // imageUpload: true, // Activate the option
      //uploadPath: 'upload.php',
      preview: true,
      onPreview: function onPreview(content, callback) {
        callback(marked(content));
      }
    }); //Handle the form submit

    handleAddPostForm();
  } //End If page is addpost

});

/***/ }),

/***/ "./resources/js/modules/admin/post/all-post.js":
/*!*****************************************************!*\
  !*** ./resources/js/modules/admin/post/all-post.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helper/functions */ "./resources/js/helper/functions.js");


var returnHtmlOutPut = function returnHtmlOutPut(result) {
  var htmloutput = "",
      postWrapperDiv = $("#all-post-wrapper");

  if (result.err) {
    postWrapperDiv.html("<p>" + result.res + "</p>");
    return;
  }

  if (result.res.length > 0) {
    $.each(result.res, function (key, value) {
      htmloutput += '<div class="admin-post-detail-wrapper p-2 box-shadow mb-4">';
      htmloutput += '<div class="text-right">';
      htmloutput += "<button class=\"btn btn-primary edit-post-btn no-border-radius\" type=\"button\" data-dir=\"".concat(value.id, "\"><span><i class=\"fas fa-edit\"></i></span></button>");
      htmloutput += "<button class=\"btn btn-danger delete-post-btn no-border-radius\" type=\"button\"><span><i class=\"fas fa-trash\"></i></span></button>";
      htmloutput += '</div>';
      htmloutput += "<h4>".concat(value.title, "</h4>");
      htmloutput += "<p>\n            Status: <span class=\"admin-detail-value-span ".concat(value.status == 'saved' ? 'text-danger' : 'text-success', "\"><strong>").concat(value.status, "</strong></span><br/>\n            Created date: <span class=\"admin-detail-value-span\">").concat(value.created_at, "</span><br/> \n            Created by: <span class=\"admin-detail-value-span\">").concat(value.createdby_name, "</span><br/>\n            Updated date: <span class=\"admin-detail-value-span\">").concat(value.updated_at == value.created_at ? "--" : value.updated_at, "</span><br/>\n            Updated by: <span class=\"admin-detail-value-span\">").concat(value.updatedby_name == null ? "--" : value.updatedby_name, "</span><br/>\n            </p>");
      htmloutput += '</div>';
    });
  } else {
    htmloutput += '<p class="text-center">There is currently no post.</p>';
  }

  postWrapperDiv.html(htmloutput);
  $(".next-pre-btn-wrapper").data("resultperpage", result.resultPerPage);
};

var handlePostPagination = function handlePostPagination() {
  var initialPageLoadObject = "",
      output = "",
      intialPageNumber = "",
      intialLastPageNumber = "",
      postWrapperDiv = $("#all-post-wrapper"),
      loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
      ajaxEndPoint = routes.adminLoadMorePost;
  initialPageLoadObject = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleAjaxPaginationInitialPageLoad)();
  intialPageNumber = initialPageLoadObject.intialPageNumber;
  intialLastPageNumber = initialPageLoadObject.intialLastPageNumber;
  $(".next-btn").click(function () {
    postWrapperDiv.html(loader);
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(postWrapperDiv);
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleAjaxPaginationNextBtn)(returnHtmlOutPut, ajaxEndPoint, intialPageNumber, intialLastPageNumber);
  });
  $(".pre-btn").click(function () {
    postWrapperDiv.html(loader);
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(postWrapperDiv);
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleAjaxPaginationPreviousBtn)(returnHtmlOutPut, ajaxEndPoint, intialPageNumber, intialLastPageNumber);
  });
};

var handleEditPostButtonClicked = function handleEditPostButtonClicked() {
  $(document).on("click", ".edit-post-btn", function () {
    var postId = $(this).data("dir");
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)("admin/editpost/".concat(postId), false);
  });
};

var handleAdminDeletePostBtn = function handleAdminDeletePostBtn() {
  $(document).on("click", ".delete-post-btn", function () {
    var deletePostBtn = $(this),
        postHasImages = deletePostBtn.data("posthasimages"),
        cloudinaryFolderName = deletePostBtn.data("cloudinaryfoldername"),
        postid = deletePostBtn.data("postid"),
        postTitle = deletePostBtn.parent().parent().find(".post-title").text(),
        infoElement = "",
        postErrDiv = deletePostBtn.parent().parent().find(".post-error-div"),
        resultPerPage = $(".next-pre-btn-wrapper").data("resultperpage"),
        timer = "",
        time = 1200;
    postErrDiv.slideUp("slow");

    if (window.confirm("Delete post with title (".concat(postTitle, ") ? please note this can not be undone"))) {
      deletePostBtn.text("Deleting...."); //Make ajax call to update category

      clearInterval(timer);
      timer = setTimeout(function () {
        $.ajax({
          method: "POST",
          headers: {
            Accept: "application/json" //Authorization: tokenData,

          },
          url: routes.adminDeletepost,
          //Blade Global veriable defined in the footer
          data: {
            postId: postid,
            postHasImages: postHasImages,
            cloudinaryFolderName: cloudinaryFolderName
          },
          success: function success(data) {
            if ($.isEmptyObject(data.error)) {
              time = 1500;
              deletePostBtn.removeClass("btn-danger").addClass("btn-success").text("Success");
              clearInterval(timer);
              timer = setTimeout(function () {
                deletePostBtn.parent().parent().remove(); //Check how many result left on the page and if is zero reload the page for ne records

                var newResultPerPageValue = resultPerPage - 1;

                if (newResultPerPageValue == 0) {
                  location.reload();
                } else {
                  //update resultPerPage value
                  $(".next-pre-btn-wrapper").data("resultperpage", newResultPerPageValue);
                }
              }, time); //timer
            } else {
              deletePostBtn.removeClass("btn-success").addClass("btn-danger").html('<span><i class="fas fa-trash"></i></span>'); //Show error

              infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(data.error, "error");
              postErrDiv.html(infoElement).slideDown("slow");
            }
          }
        });
      }, time); // timer before ajax action;
    } //End window confirmation

  });
};

$(function () {
  var page = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(1); //If page is all post

  if (page == "allpost") {
    //Handle post pagination
    handlePostPagination();
    handleEditPostButtonClicked();
    handleAdminDeletePostBtn();
  }
});

/***/ }),

/***/ "./resources/js/modules/admin/post/edit-post.js":
/*!******************************************************!*\
  !*** ./resources/js/modules/admin/post/edit-post.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helper/functions */ "./resources/js/helper/functions.js");


var handleRemoveImageBtn = function handleRemoveImageBtn() {
  $(".uploaded-image .delete-image").click(function () {
    var imgPublicId = $(this).parent().find("input[type='hidden']").val(),
        imgPublicIdArray = $("#post-images-tobe-deleted").data("imgpublicid");
    imgPublicIdArray.push(imgPublicId); // alert(imgPublicId);
  });
};

var handleEditPostForm = function handleEditPostForm() {
  var editPostForm = $("#edit-post-form"); //Reset form on page load

  editPostForm.submit(function (e) {
    e.preventDefault();
    var errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        title = $("#title"),
        formData = new FormData(this),
        files = $("#edit-post-form input[type=file]")[0],
        preloadedFiles = editPostForm.find('input[name^="old"]'),
        totalOldFiles = preloadedFiles.length,
        totalNewFiles = files.files.length,
        preloadedFilesToBeDeleted = $("#post-images-tobe-deleted").data("imgpublicid"),
        totalPreloadedFilesToBeDeleted = preloadedFilesToBeDeleted.length,
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        selectedCategories = $("#admin-post-category-select"),
        postBody = $("#postbody"),
        infoElement = "",
        msg = "",
        timer = "",
        time = 1200; //hide validation error

    errDiv.slideUp("slow"); //Image file is optional, only validate if user attempt to upload

    if (totalNewFiles + totalOldFiles > 10) {
      infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)("Maximum 10 images please thank you", "error");
      errDiv.html(infoElement).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(formWrapper);
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    } //Add new images files to form data if totalNewFiles > 0


    if (totalNewFiles > 0) {
      for (var i = 0; i < totalNewFiles; i++) {
        formData.append("files" + i, files.files[i]);
      }
    } //Apend totalNewfiles to from data


    formData.append("totalNewFiles", totalNewFiles);
    formData.append("preloadedFilesToBeDeleted[]", preloadedFilesToBeDeleted);
    formData.append("totalPreloadedFilesToBeDeleted", totalPreloadedFilesToBeDeleted);

    if (title.val().trim() == "") {
      infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)("Post title required", "error");
      title.addClass("input-error");
      errDiv.html(infoElement).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(formWrapper);
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    } else {
      title.removeClass("input-error");
    }

    if (selectedCategories.get(0).selectedIndex == -1) {
      infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)("Please select at least on category", "error");
      $(".easySelect").addClass("input-error");
      errDiv.html(infoElement).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(formWrapper);
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    } else {
      $(".easySelect").removeClass("input-error");
    }

    if (postBody.val().trim() == "") {
      infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)("Post body required", "error");
      $(".md-toolbar").addClass("input-error");
      $(".md-editor").addClass("input-error");
      errDiv.html(infoElement).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(formWrapper);
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    } else {
      $(".md-toolbar").removeClass("input-error");
      $(".md-editor").removeClass("input-error");
    }

    if ($('input[name="saveorpublish"]:checked').length == 0) {
      infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)("Select either to save or published post", "error");
      errDiv.html(infoElement).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(formWrapper);
      $(".saveorpublish").addClass("input-error");
      return;
    } else {
      $(".saveorpublish").removeClass("input-error");
    } // console.log(formData);
    // return


    formWrapper.prepend(loader);
    editPostForm.hide("slow");
    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json" // Authorization:
          //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NTE1NzU2NjksImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsIm5iZiI6MTY1MTU3NTY3OSwiZXhwIjoxNjUxNTc2MTY5LCJkYXRhIjp7ImVtYWlsIjoiZGRkZGRAZ21haWwuY29tIn19.zsPadnoglvaxGUwlkusKD6TlNCUEMhJKvxqKnOWds3K7-wPF9jilkzTuyCWjRe8P1bHyFLT5HJ0tNDWl72T0GQ",

        },
        url: routes.adminUpdatepost,
        //Blade Global veriable defined in the footer
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            time = 1500;
            msg = "Post updated successfully, please wait...";
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success");
            editPostForm.trigger("reset");
            $(".loader").append(infoElement);
            clearInterval(timer);
            timer = setTimeout(function () {
              $(".success").remove();
              $(".loader").remove();
              editPostForm.hide("fast");
              location.reload();
            }, time);
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            editPostForm.slideDown("slow");
            msg = data.error;
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error");
            errDiv.html(infoElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)(formWrapper);
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          }
        }
      });
    }, time); // timer before action;
  }); //Category multiselect on click
  //Hide errors

  $(".styledSelect").click(function () {
    $(".easySelect").removeClass("input-error");
    $(".err-div").slideUp("slow");
  }); //Radio button checked
  //Hide error

  $('input[name="saveorpublish"]').focus(function () {
    $(".saveorpublish").removeClass("input-error");
  });
};

$(function () {
  var page = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(2); //If page is Edit post

  if (page == "editpost") {
    //set proloaded image url and id
    var imgUrls = $(".edit-post-input-images").data("imgurls"),
        imgPublicIds = $(".edit-post-input-images").data("imgpublicids"),
        preloaded = [];

    if (imgUrls != "undefined" && imgUrls.length > 0) {
      for (var i = 0; i < imgUrls.length; i++) {
        preloaded.push({
          id: imgPublicIds[i],
          src: imgUrls[i]
        });
      }
    }

    $(".edit-post-input-images").imageUploader({
      imagesInputName: "files",
      maxSize: 2 * 1024 * 1024,
      maxFiles: 10,
      preloaded: preloaded,
      preloadedInputName: 'old'
    });
    $("#admin-post-category-select").easySelect({
      buttons: true,
      // 
      search: true,
      placeholder: 'Choose category',
      placeholderColor: '#524781',
      selectColor: '#524781',
      itemTitle: 'categories selected',
      showEachItem: true,
      width: '100%',
      dropdownMaxHeight: '450px'
    });
    $('#postbody').markdownEditor({
      // imageUpload: true, // Activate the option
      //uploadPath: 'upload.php',
      preview: true,
      onPreview: function onPreview(content, callback) {
        callback(marked(content));
      }
    }); //set preSelected category option

    var preSelectCategories = $("#admin-post-category-select").data("catids");
    $('.mulpitply_checkbox_style').each(function () {
      // check if the current item value is in the array
      if ($.inArray($(this).val(), preSelectCategories) != -1) {
        // trigger a click event in order to preselect the item
        $(this).trigger('click');
      }
    });
    handleRemoveImageBtn();
    handleEditPostForm();
  } //END IF PAGE IS ADMIN EDIT

});

/***/ }),

/***/ "./resources/js/modules/blog/blog-sidebar.js":
/*!***************************************************!*\
  !*** ./resources/js/modules/blog/blog-sidebar.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/functions */ "./resources/js/helper/functions.js");


var handleBlogSidebarCategorySearch = function handleBlogSidebarCategorySearch() {
  var inputElement = $("#sidebar-search-category-input"),
      categoryWrapper = $('.sidebar-category-link-wrapper'),
      clearBtn = $(".sidebar-search-category-icon-times");
  (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleCategorySearchFilter)(inputElement, categoryWrapper, clearBtn);
};

$(function () {
  //Run this code only on blog page
  var page = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(2);

  if (page == "post" || page == "category" || page == "blog") {
    handleBlogSidebarCategorySearch();
  }
});

/***/ }),

/***/ "./resources/js/modules/contact.js":
/*!*****************************************!*\
  !*** ./resources/js/modules/contact.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/functions */ "./resources/js/helper/functions.js");
/* harmony import */ var _helper_validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/validations */ "./resources/js/helper/validations.js");



var handleContactLink = function handleContactLink(e) {
  $(document).on("click", ".contact-link", function (e) {
    e.preventDefault();
    $("#contactModal").modal("show");
    $(".contact-link").hide("slow");
  });
  $(document).on("click", ".close-contact-modal", function () {
    $(".contact-link").show("slow"); //location.reload();
  });
};

var handleContactForm = function handleContactForm() {
  $(document).on("click", "#contact-form-btn", function (e) {
    e.preventDefault();
    var contactForm = $("#contact-form"),
        errDiv = $(".err-div-contact-form"),
        formWrapper = $(".form-wrapper-contact-form"),
        formData = contactForm.serializeArray(),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        infoElement = "",
        msg = "",
        timer = "",
        validationRes = "",
        time = 1200; //hide validation error

    errDiv.slideUp("slow"); //Validate form values

    validationRes = (0,_helper_validations__WEBPACK_IMPORTED_MODULE_1__.validateElementEmpty)($("#c-name"), "*Please provide your name");

    if (validationRes != true) {
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)($("#contactModal"));
      errDiv.html(validationRes).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)("err-div-contact-form");
      return;
    }

    validationRes = (0,_helper_validations__WEBPACK_IMPORTED_MODULE_1__.validateEmail)($("#c-email"));

    if (validationRes != true) {
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)($("#contactModal"));
      errDiv.html(validationRes).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)("err-div-contact-form");
      return;
    }

    validationRes = (0,_helper_validations__WEBPACK_IMPORTED_MODULE_1__.validateElementEmpty)($("#c-phone"), "*Please provide a phone number");

    if (validationRes != true) {
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)($("#contactModal"));
      errDiv.html(validationRes).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)("err-div-contact-form");
      return;
    }

    validationRes = (0,_helper_validations__WEBPACK_IMPORTED_MODULE_1__.validateElementEmpty)($("#c-message"), "*Please provide your message");

    if (validationRes != true) {
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)($("#contactModal"));
      errDiv.html(validationRes).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)("err-div-contact-form");
      return;
    }

    formWrapper.append(loader);
    $(".form-top-text").hide("slow");
    contactForm.hide("slow");
    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        url: routes.contactIndex,
        //Blade Global veriable defined in the footer
        data: formData,
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            $(".loader").remove();
            msg = "Thank you for getting intouch, I will get back to you soon.";
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success");
            contactForm.trigger("reset");
            formWrapper.html(infoElement);
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            $(".form-top-text").show("slow");
            contactForm.slideDown("slow");
            msg = data.error;
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error");
            errDiv.html(infoElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)("err-div-contact-form");
          }
        }
      });
    }, time); // timer before action;
  });
};

$(function () {
  handleContactLink();
  handleContactForm();
});

/***/ }),

/***/ "./resources/js/modules/forgotten-pwd.js":
/*!***********************************************!*\
  !*** ./resources/js/modules/forgotten-pwd.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/functions */ "./resources/js/helper/functions.js");
/* harmony import */ var _helper_validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/validations */ "./resources/js/helper/validations.js");



var handleForgottenPwdForm = function handleForgottenPwdForm() {
  var regemail = localStorage.getItem("regemail");

  if (regemail) {
    $("#forgotten-pwd-email-input").val(regemail);
  }

  $(document).on("click", "#forgotten-pwd-form-btn", function (e) {
    e.preventDefault();
    var forgottenPwdForm = $("#forgotten-pwd-form"),
        errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        formData = forgottenPwdForm.serializeArray(),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        infoElement = "",
        msg = "",
        timer = "",
        validationRes = "",
        time = 1200; //hide validation error

    errDiv.slideUp("slow"); //Validate form values

    validationRes = (0,_helper_validations__WEBPACK_IMPORTED_MODULE_1__.validateEmail)($("#forgotten-pwd-email-input"));

    if (validationRes != true) {
      errDiv.html(validationRes).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    }

    $(".form-top-text").hide("slow");
    forgottenPwdForm.hide("slow");
    formWrapper.append(loader);
    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        url: routes.handleForgottenPassForm,
        //Blade Global veriable defined in the footer
        data: formData,
        success: function success(data) {
          //Remove validation error
          $(".loader").remove();

          if ($.isEmptyObject(data.error)) {
            //Remove user email from localstorage if its there.
            if (regemail) {
              localStorage.removeItem("regemail");
            }

            msg = "Please check your email and follow the instruction to continue thank you.";
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "info");
            forgottenPwdForm.trigger("reset");
            formWrapper.html(infoElement);
          } else {
            $(".form-top-text").show("slow");
            forgottenPwdForm.slideDown("slow");
            msg = data.error;
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error");
            errDiv.html(infoElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          }
        }
      });
    }, time); // timer before action;
  });
};

$(function () {
  //Run this code only on forgotten pass page
  var page = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(1);

  if (page == "forgotten-pass") {
    //Run above function to handle the form
    handleForgottenPwdForm();
  }
});

/***/ }),

/***/ "./resources/js/modules/header.js":
/*!****************************************!*\
  !*** ./resources/js/modules/header.js ***!
  \****************************************/
/***/ (() => {

var toggleMenu = function toggleMenu() {
  $("#small-screen-open-menu-btn").click(function () {
    $("header .header-content-wrapper .middle-content-wrapper").css("minWidth", "100%");
  });
  $("#small-screen-close-menu-btn").click(function () {
    $("header .header-content-wrapper .middle-content-wrapper").css("minWidth", "0");
  });
};

$(document).ready(function () {
  toggleMenu();
});

/***/ }),

/***/ "./resources/js/modules/login.js":
/*!***************************************!*\
  !*** ./resources/js/modules/login.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/functions */ "./resources/js/helper/functions.js");


var handleLogin = function handleLogin() {
  (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.inputTypeToggler)(".pwd-btn", ".login-pwd", "click", "text", true);
  $(document).on("click", ".login-form-btn", function (e) {
    e.preventDefault();
    var loginForm = $(".login-form"),
        errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        formData = $(".login-form").serializeArray(),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        errorElement = "",
        msg = "",
        timer = "",
        timer2 = "",
        time2 = 1500,
        time = 1200; //hide validation error

    errDiv.slideUp("slow");
    formWrapper.append(loader);
    $(".form-top-text").hide("slow");
    loginForm.hide("slow");
    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json" // Authorization:
          //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NTE1NzU2NjksImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsIm5iZiI6MTY1MTU3NTY3OSwiZXhwIjoxNjUxNTc2MTY5LCJkYXRhIjp7ImVtYWlsIjoiZGRkZGRAZ21haWwuY29tIn19.zsPadnoglvaxGUwlkusKD6TlNCUEMhJKvxqKnOWds3K7-wPF9jilkzTuyCWjRe8P1bHyFLT5HJ0tNDWl72T0GQ",

        },
        url: routes.handleLoginForm,
        //Blade Global veriable defined in the footer
        data: formData,
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            msg = "Login successful, please wait...";
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success");
            loginForm.trigger("reset");
            $(".loader").append(errorElement);
            clearInterval(timer2);
            timer2 = setTimeout(function () {
              (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)(data.redirectUrl);
              $(".success").remove();
              $(".loader").remove();
              $(".login-wrapper-div").hide("fast");
            }, time2);
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            $(".form-top-text").show("slow");
            loginForm.slideDown("slow");
            msg = data.error;
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error");
            errDiv.html(errorElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          }
        }
      });
    }, time); // timer before action;
  });
};

$(function () {
  //Run this code only on reset pass page
  var page = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(1);

  if (page == "login") {
    //Run above function to handle the form
    handleLogin();
  }
});

/***/ }),

/***/ "./resources/js/modules/logout.js":
/*!****************************************!*\
  !*** ./resources/js/modules/logout.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/functions */ "./resources/js/helper/functions.js");


var logout = function logout() {
  $(document).on("click", "#logout-link", function (e) {
    e.preventDefault();
    var logoutModalHeaderTitle = $("#logoutModal .modal-title"),
        logoutModalBody = $("#logoutModal .modal-body"),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        errorElement = "",
        msg = "",
        timer = "",
        timer2 = "",
        time2 = 1700,
        time = 1200;
    $("#logoutModal").modal("show");
    logoutModalBody.html(loader);
    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        url: routes.logoutIndex,
        //Blade Global veriable defined in the footer
        data: {},
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            msg = "signed out successful, please wait...";
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success");
            $(".loader").append(errorElement);
            clearInterval(timer2);
            timer2 = setTimeout(function () {
              //redirect to home page
              $(".success").remove();
              $(".loader").remove();
              (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirectToHomePage)();
            }, time2);
          } else {
            $(".loader").remove();
            msg = data.error;
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error");
            logoutModalBody.html(errorElement);
          }
        }
      });
    }, time); // timer before action;
  });
};

$(function () {
  logout();
});

/***/ }),

/***/ "./resources/js/modules/register.js":
/*!******************************************!*\
  !*** ./resources/js/modules/register.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/functions */ "./resources/js/helper/functions.js");
/* harmony import */ var _helper_validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/validations */ "./resources/js/helper/validations.js");



var handleInitialRegister = function handleInitialRegister() {
  $(document).on("click", "#initial-register-form-btn", function (e) {
    e.preventDefault();
    var regForm = $("#initial-register-form"),
        errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        formData = regForm.serializeArray(),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        infoElement = "",
        msg = "",
        timer = "",
        validationRes = "",
        time = 1200; //hide validation error

    errDiv.slideUp("slow"); //Validate form values

    validationRes = (0,_helper_validations__WEBPACK_IMPORTED_MODULE_1__.validateEmail)($("#initial-register-email-input"));

    if (validationRes != true) {
      errDiv.html(validationRes).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    }

    formWrapper.append(loader);
    $(".form-top-text").hide("slow");
    regForm.hide("slow");
    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json" // Authorization:
          //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NTE1NzU2NjksImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsIm5iZiI6MTY1MTU3NTY3OSwiZXhwIjoxNjUxNTc2MTY5LCJkYXRhIjp7ImVtYWlsIjoiZGRkZGRAZ21haWwuY29tIn19.zsPadnoglvaxGUwlkusKD6TlNCUEMhJKvxqKnOWds3K7-wPF9jilkzTuyCWjRe8P1bHyFLT5HJ0tNDWl72T0GQ",

        },
        url: routes.initialRegister,
        //Blade Global veriable defined in the footer
        data: formData,
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            $(".loader").remove(); //Temp store the user reg email in local storge

            localStorage.setItem("regemail", $("#initial-register-email-input").val());
            msg = "Please check your email and follow the instruction to continue thank you.";
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "info");
            regForm.trigger("reset");
            formWrapper.html(infoElement);
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            $(".form-top-text").show("slow");
            regForm.slideDown("slow");
            msg = data.error;
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error");
            errDiv.html(infoElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          }
        }
      });
    }, time); // timer before action;
  });
}; //###################### COMPLETE REGISTRATION #########################
//######################################################################


var handleCompleteRegister = function handleCompleteRegister() {
  (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.inputTypeToggler)(".pwd-btn", "#pwd", "click", "text", true);
  $(document).on("click", "#complete-register-form-btn", function (e) {
    e.preventDefault(); //get user reg email from local storage

    var regemail = localStorage.getItem("regemail"); //Redirect to home page if reg email is not there.

    if (!regemail) {
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)(routes.homeIndex, true);
      return;
    } //Set user reg in hidden input


    $("#complete-reg-email").val(regemail); //Set some form variables

    var completeRegForm = $("#complete-register-form"),
        errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        infoElement = "",
        msg = "",
        timer = "",
        timer2 = "",
        time2 = 1700,
        //validationRes = "",
    time = 1200; //hide validation error

    errDiv.hide("slow"); //Validate form values

    var formData = completeRegForm.serializeArray();
    formWrapper.append(loader);
    $(".form-top-text").hide("slow");
    completeRegForm.slideUp("slow");
    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        url: routes.storeCompleteRegister,
        //Blade Global veriable defined in the footer
        data: formData,
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            completeRegForm.trigger("reset");
            msg = "Registration successful";
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success");
            $(".loader").append(infoElement);
            clearInterval(timer2);
            timer2 = setTimeout(function () {
              //Show the login form
              $(".success").remove();
              $(".loader").remove(); //Remove regemail form local storage

              localStorage.removeItem("regemail");
              (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)(routes.blogIndex, true);
            }, time2);
          } else {
            //Remove validation error
            errDiv.slideUp("slow");
            $(".loader").remove();
            $(".form-top-text").show("slow");
            completeRegForm.slideDown("slow");
            msg = data.error;
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error");
            errDiv.html(infoElement).show("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          }
        }
      });
    }, time); // timer before action;
  });
};

$(function () {
  //Run this code only on register & complete-register page
  var page = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(1);

  if (page == "register") {
    //Run above function to handle the form
    handleInitialRegister();
  } else if (page == "complete-register") {
    handleCompleteRegister();
  }
});

/***/ }),

/***/ "./resources/js/modules/reset-pwd.js":
/*!*******************************************!*\
  !*** ./resources/js/modules/reset-pwd.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/functions */ "./resources/js/helper/functions.js");


var handleResetPwdForm = function handleResetPwdForm() {
  (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.inputTypeToggler)(".pwd-btn", "#reset-pwd", "click", "text", true);
  $(document).on("click", "#reset-password-form-btn", function (e) {
    e.preventDefault();
    var resetPwdForm = $("#reset-password-form"),
        errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        formData = resetPwdForm.serializeArray(),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        infoElement = "",
        msg = "",
        timer = "",
        timer2 = "",
        time = 1200,
        time2 = 4000,
        tokenData = "",
        tk = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(1); //hide validation error

    errDiv.slideUp("slow"); //Send token for checking

    tokenData = "Bearer " + tk;
    $(".form-top-text").hide("slow");
    resetPwdForm.hide("slow");
    formWrapper.append(loader);
    clearInterval(timer);
    timer = setTimeout(function () {
      $.ajax({
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: tokenData
        },
        url: routes.resetPassUpdate,
        //Blade Global veriable defined in the footer
        data: formData,
        success: function success(data) {
          if (data.error == "" && data.action == "") {
            msg = "Password reset successful";
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success");
            resetPwdForm.trigger("reset");
            $(".loader").append(infoElement);
            clearInterval(timer2);
            timer2 = setTimeout(function () {
              //Show the login form
              $(".success").remove();
              $(".loader").remove(); //Remove user email from localstorage if its there.

              if (localStorage.getItem("regemail")) {
                localStorage.removeItem("regemail");
              } //Redirect user to login page


              (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)(routes.loginIndex, true);
            }, time2);
          } else if (data.error != "" && data.action == "") {
            $(".loader").remove();
            $(".form-top-text").show("slow");
            resetPwdForm.slideDown("slow");
            msg = data.error;
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error");
            errDiv.html(infoElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          } else {
            msg = data.error;
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error");
            resetPwdForm.trigger("reset");
            $(".loader").append(infoElement);
            clearInterval(timer2);
            timer2 = setTimeout(function () {
              //Show the login form
              $(".success").remove();
              $(".loader").remove();
              (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)(routes.forgottenPass, true);
            }, time2);
          }
        }
      });
    }, time); // timer before action;
  });
};

$(function () {
  //Run this code only on reset pass page
  var page = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(2);

  if (page == "reset-pass") {
    //Run above function to handle the form
    handleResetPwdForm();
  }
});

/***/ }),

/***/ "./resources/js/modules/util.js":
/*!**************************************!*\
  !*** ./resources/js/modules/util.js ***!
  \**************************************/
/***/ (() => {

// Helper function
var domReady = function domReady(cb) {
  document.readyState === 'interactive' || document.readyState === 'complete' ? cb() : document.addEventListener('DOMContentLoaded', cb);
};

domReady(function () {
  // Display body when DOM is loaded
  document.body.style.visibility = 'visible';
});

/***/ }),

/***/ "./resources/js/modules/verify.js":
/*!****************************************!*\
  !*** ./resources/js/modules/verify.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/functions */ "./resources/js/helper/functions.js");


var redirectAfterVerify = function redirectAfterVerify(action, infoElement, errorStatus) {
  var timer2 = "",
      time2 = 5000,
      token = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(2);
  $(".loader").append(infoElement);
  clearInterval(timer2);
  timer2 = setTimeout(function () {
    $(".success").remove();
    $(".loader").remove(); //redirect user base on the action
    //check if there is an errorStatus if true

    switch (action) {
      case "register":
        if (errorStatus) {
          (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)(routes.registerIndex, true);
        } else {
          (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)(routes.showCompleteRegisterForm, true);
        }

        break;

      case "forgotten_pass":
        if (errorStatus) {
          (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)(routes.forgottenPass, true);
        } else {
          (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)("reset-pass/" + token);
        }

        break;

      default:
        (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)(routes.homeIndex, true);
        return;
    }
  }, time2);
};

var verifyToken = function verifyToken() {
  var tk = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(2),
      action = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(1),
      tokenData = "",
      msg = "",
      infoElement = "",
      loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
      verifyModal = $("#verifyModal"),
      verifyModalHeaderTitle = $("#verifyModal .modal-title"),
      verifyModalBody = $("#verifyModal .modal-body"),
      timer = "",
      time = 1200; //check if action matches what we are looking for.
  //Redirect to home page

  if (action != "register" && action != "forgotten_pass") {
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)(routes.homeIndex, true);
    return;
  } //Show spinner and modal


  verifyModalBody.append(loader);
  verifyModal.modal("show"); //Send token for checking

  tokenData = "Bearer " + tk;
  clearInterval(timer);
  timer = setTimeout(function () {
    $.ajax({
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: tokenData
      },
      url: routes.verifyToken,
      //Blade Global veriable defined in the footer
      data: {
        action: action
      },
      success: function success(data) {
        if ($.isEmptyObject(data.error)) {
          //If no error
          msg = "Redirecting";
          infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "info");
          redirectAfterVerify(action, infoElement); //Find this function above
        } else {
          //Show error
          msg = data.error;
          infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error");
          redirectAfterVerify(action, infoElement, true); // Find this function above
        }
      }
    });
  }, time); // timer before ajax action;
  // Close modal

  $("#verify-modal-close-btn").click(function () {
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleCloseModal)("", routes.blogIndex, true, false, false);
  });
};

$(function () {
  //Only run this function if page is equal to verify
  var page = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(3);

  if (page == "verify") {
    verifyToken();
  }
});

/***/ }),

/***/ "./resources/scss/main.scss":
/*!**********************************!*\
  !*** ./resources/scss/main.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/main"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/main"], () => (__webpack_require__("./resources/scss/main.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;