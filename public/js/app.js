/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./modules/header */ "./resources/js/modules/header.js");

__webpack_require__(/*! ./modules/auth */ "./resources/js/modules/auth.js");

__webpack_require__(/*! ./modules/register */ "./resources/js/modules/register.js");

__webpack_require__(/*! ./modules/forgotten-pwd */ "./resources/js/modules/forgotten-pwd.js");

__webpack_require__(/*! ./modules/reset-pwd */ "./resources/js/modules/reset-pwd.js");

__webpack_require__(/*! ./modules/login */ "./resources/js/modules/login.js");

__webpack_require__(/*! ./modules/verify */ "./resources/js/modules/verify.js");

__webpack_require__(/*! ./modules/work */ "./resources/js/modules/work.js");

__webpack_require__(/*! ./modules/review */ "./resources/js/modules/review.js");

__webpack_require__(/*! ./modules/logout */ "./resources/js/modules/logout.js");

/***/ }),

/***/ "./resources/js/helper/functions.js":
/*!******************************************!*\
  !*** ./resources/js/helper/functions.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleCloseModal": () => (/* binding */ handleCloseModal),
/* harmony export */   "handleErrorOnFocus": () => (/* binding */ handleErrorOnFocus),
/* harmony export */   "handleOutputInFo": () => (/* binding */ handleOutputInFo),
/* harmony export */   "hideElement": () => (/* binding */ hideElement),
/* harmony export */   "inputTypeToggler": () => (/* binding */ inputTypeToggler),
/* harmony export */   "redirect": () => (/* binding */ redirect),
/* harmony export */   "redirectToHomePage": () => (/* binding */ redirectToHomePage),
/* harmony export */   "returnLoaderSpinner": () => (/* binding */ returnLoaderSpinner),
/* harmony export */   "returnPartOfUrl": () => (/* binding */ returnPartOfUrl)
/* harmony export */ });
var returnBaseUrl = function returnBaseUrl() {
  return window.location.protocol + "//" + window.location.host + "/";
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
  var isMsgArr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  switch (type) {
    case "success":
      return '<div class="no-border-radius alert alert-success"><strong>Success! </strong>' + msg + "</div>";

    case "error":
      if (isMsgArr) {
        var errElement = "<ul>";
        $.each(msg, function (key, value) {
          errElement += "<li>*" + value + "</li>";
        });
        errElement += "</ul>";
        return '<div class="no-border-radius alert alert-danger"><strong>Error! </strong>' + errElement + "</div>";
      } else {
        return '<div class="no-border-radius alert alert-danger"><strong>Error! </strong>' + msg + "</div>";
      }

    case "info":
      return '<div class="no-border-radius alert alert-secondary"><strong>Info! </strong>' + msg + "</div>";

    default:
      return "";
  }
};
var handleErrorOnFocus = function handleErrorOnFocus() {
  $("input").focus(function () {
    $(".err-div").slideUp("slow");
  });
  $("textarea").focus(function () {
    $(".err-div").slideUp("slow");
  });
  $("input[type=file]").change(function () {
    $(".err-div").slideUp("slow");
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

/***/ }),

/***/ "./resources/js/helper/validations.js":
/*!********************************************!*\
  !*** ./resources/js/helper/validations.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
  var elemValue = elemId.val();
  var elemValue2 = elemId2.val();

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

/***/ }),

/***/ "./resources/js/modules/auth.js":
/*!**************************************!*\
  !*** ./resources/js/modules/auth.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/functions */ "./resources/js/helper/functions.js");
 // Auth back btn

$(".auth-back-btn").click(function () {
  $("#authModal .modal-title").text("Select option");
  $(this).parent().hide("fast");
  $(this).parent().parent().find("#auth-option-wrapper").show("slow");
}); // Trigger auth form

$(".auth-btn").click(function () {
  var authFormWrapper = $(this).data("dir"),
      authModalHeaderTitle = $("#authModal .modal-title"),
      timer = "",
      time = 300;
  $(this).parent().slideUp("fast");
  clearInterval(timer);
  timer = setTimeout(function () {
    switch (authFormWrapper) {
      case "auth-option-login-wrapper":
        authModalHeaderTitle.text("Login securely");
        $("#".concat(authFormWrapper)).slideDown("slow");
        break;

      case "auth-option-forgotten-pass-wrapper":
        authModalHeaderTitle.text("Forgotton password?");
        $("#".concat(authFormWrapper)).slideDown("slow");
        break;

      case "auth-option-register-wrapper":
        authModalHeaderTitle.text("Register");
        $("#".concat(authFormWrapper)).slideDown("slow");
        break;

      default:
        authModalHeaderTitle.text("Select option");
        $(this).parent().slideDown("fast");
    }
  }, time); // timer before switch;
}); // Close modal

$(document).on("click", "#auth-modal-close-btn", function () {
  var authModal = $("#authModal");
  (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleCloseModal)(authModal, "", false, true, true);
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



var forgottenPwd = function forgottenPwd() {
  $(document).on("click", "#forgotten-pwd-form-btn", function (e) {
    e.preventDefault();
    var forgottenPwdForm = $("#forgotten-pwd-form"),
        errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        formData = forgottenPwdForm.serializeArray(),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        errorElement = "",
        msg = "",
        timer = "",
        validationRes = "",
        time = 1200; //hide validation error

    errDiv.slideUp("slow"); //Validate form values

    validationRes = (0,_helper_validations__WEBPACK_IMPORTED_MODULE_1__.validateEmail)($("#forgotten-pwd-email"));

    if (validationRes != true) {
      errDiv.html(validationRes).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    }

    $(".auth-back-btn").hide("slow");
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
        url: routes.authIndex,
        //Blade Global veriable defined in the footer
        data: formData,
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            $(".loader").remove();
            msg = "Please check your email and follow the instruction to continue thank you.";
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "info", false);
            forgottenPwdForm.trigger("reset");
            formWrapper.html(errorElement);
          } else {
            //Remove validation error
            $(".loader").remove();
            $(".auth-back-btn").show("slow");
            $(".form-top-text").show("slow");
            forgottenPwdForm.slideDown("slow");
            msg = data.error;
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error", true);
            errDiv.html(errorElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          }
        }
      });
    }, time); // timer before action;
  });
};

$(function () {
  forgottenPwd();
});

/***/ }),

/***/ "./resources/js/modules/handle-complete-register.js":
/*!**********************************************************!*\
  !*** ./resources/js/modules/handle-complete-register.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleCompleteRegister": () => (/* binding */ handleCompleteRegister)
/* harmony export */ });
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/functions */ "./resources/js/helper/functions.js");
/* harmony import */ var _helper_validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/validations */ "./resources/js/helper/validations.js");


var handleCompleteRegister = function handleCompleteRegister() {
  (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.inputTypeToggler)(".pwd-btn", "#pwd", "click", "text", true);
  $(document).on("click", "#complete-register-form-btn", function (e) {
    e.preventDefault();
    var completeRegForm = $("#complete-register-form"),
        errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        infoElement = "",
        msg = "",
        timer = "",
        validationRes = "",
        time = 1200; //hide validation error

    errDiv.hide("slow"); //Validate form values
    // validationRes = validateEmail($("#registerFormEmail"));
    // if (validationRes != true) {
    //     errDiv.html(validationRes).show("slow");
    //     handleErrorOnFocus();
    //     return;
    // }

    $(":disabled").prop("disabled", false);
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
        url: routes.authStore,
        //Blade Global veriable defined in the footer
        data: formData,
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            $(".loader").remove();
            msg = "Registration successful";
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "info", false);
            completeRegForm.trigger("reset");
            formWrapper.html(infoElement);
          } else {
            //Remove validation error
            errDiv.slideUp("slow");
            $(".loader").remove();
            $(".form-top-text").show("slow");
            completeRegForm.slideDown("slow");
            $(":disabled").prop("disabled", true);
            msg = data.error;
            infoElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error", true);
            errDiv.html(infoElement).show("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          }
        }
      });
    }, time); // timer before action;
  });
};

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
/* harmony import */ var _helper_validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/validations */ "./resources/js/helper/validations.js");



var login = function login() {
  (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.inputTypeToggler)(".pwd-btn", "#login-pwd", "click", "text", true);
  $(document).on("click", "#login-form-btn", function (e) {
    e.preventDefault();
    var loginForm = $("#login-form"),
        errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        authModalHeaderTitle = $("#authModal .modal-title"),
        formData = loginForm.serializeArray(),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        errorElement = "",
        msg = "",
        timer = "",
        timer2 = "",
        validationRes = "",
        time2 = 1700,
        time = 1200; //hide validation error

    errDiv.slideUp("slow"); //Validate form values
    // validationRes = validateEmail($("#registerFormEmail"));
    // if (validationRes != true) {
    //     errDiv.html(validationRes).slideDown("slow");
    //     handleErrorOnFocus();
    //     return;
    // }

    formWrapper.append(loader);
    $(".auth-back-btn").hide("slow");
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
        url: routes.authLogin,
        //Blade Global veriable defined in the footer
        data: formData,
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            msg = "Login successful, please wait...";
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success", false);
            loginForm.trigger("reset");
            $(".loader").append(errorElement);
            clearInterval(timer2);
            timer2 = setTimeout(function () {
              //Show the login form
              $(".success").remove();
              $(".loader").remove();
              $(".login-wrapper-div").slideUp("slow"); //If user is admin redirect to admin dashboad
              //Else show the review form

              if (data.isAdmin) {
                (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)("admin/dashboard");
              } else {
                (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)("reviews");
              } //end if is admin

            }, time2);
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            $(".auth-back-btn").show("slow");
            $(".form-top-text").show("slow");
            loginForm.slideDown("slow");
            msg = data.error;
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error", true);
            errDiv.html(errorElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          }
        }
      });
    }, time); // timer before action;
  });
};

$(function () {
  login();
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
        url: routes.authLogout,
        //Blade Global veriable defined in the footer
        data: {},
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            msg = "Login successful, please wait...";
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success", false);
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
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error", true);
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



var register1 = function register1() {
  $(document).on("click", "#register-form1-btn", function (e) {
    e.preventDefault();
    var regForm = $("#registerForm1"),
        errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        formData = regForm.serializeArray(),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        errorElement = "",
        msg = "",
        timer = "",
        validationRes = "",
        time = 1200; //hide validation error

    errDiv.slideUp("slow"); //Validate form values

    validationRes = (0,_helper_validations__WEBPACK_IMPORTED_MODULE_1__.validateEmail)($("#registerFormEmail"));

    if (validationRes != true) {
      errDiv.html(validationRes).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    }

    formWrapper.append(loader);
    $(".auth-back-btn").hide("slow");
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
        url: routes.authIndex,
        //Blade Global veriable defined in the footer
        data: formData,
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            $(".loader").remove();
            msg = "Please check your email and follow the instruction to continue thank you.";
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "info", false);
            regForm.trigger("reset");
            formWrapper.html(errorElement);
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            $(".auth-back-btn").show("slow");
            $(".form-top-text").show("slow");
            regForm.slideDown("slow");
            msg = data.error;
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error", true);
            errDiv.html(errorElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          }
        }
      });
    }, time); // timer before action;
  });
};

$(function () {
  register1();
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
/* harmony import */ var _helper_validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/validations */ "./resources/js/helper/validations.js");



var resetPwd = function resetPwd() {
  (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.inputTypeToggler)(".pwd-btn", "#reset-pwd", "click", "text", true);
  $(document).on("click", "#reset-password-form-btn", function (e) {
    e.preventDefault();
    var resetPwdForm = $("#reset-password-form"),
        errDiv = $(".err-div"),
        verifyModalHeaderTitle = $("#verifyModal .modal-title"),
        formWrapper = $(".form-wrapper"),
        formData = resetPwdForm.serializeArray(),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        errorElement = "",
        msg = "",
        timer = "",
        timer2 = "",
        validationRes = "",
        time = 1200,
        time2 = 1700,
        tokenData = "",
        tk = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(2); //hide validation error

    errDiv.slideUp("slow"); //Validate form values
    // validationRes = validateEmail($("#forgotten-pwd-email"));
    // if (validationRes != true) {
    //     errDiv.html(validationRes).slideDown("slow");
    //     handleErrorOnFocus();
    //     return;
    // }
    //Send token for checking

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
        url: routes.authUpdate,
        //Blade Global veriable defined in the footer
        data: formData,
        success: function success(data) {
          if (data.error == "" && data.action == "") {
            msg = "Password reset successful";
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success", false);
            resetPwdForm.trigger("reset");
            $(".loader").append(errorElement);
            clearInterval(timer2);
            timer2 = setTimeout(function () {
              //Show the login form
              $(".success").remove();
              $(".loader").remove();
              $("#reset-password-wrapper-div").slideUp("slow");
              verifyModalHeaderTitle.text("Login securely");
              $("#login-wrapper-div").slideDown("slow");
            }, time2);
          } else if (data.action == "" && data.error != "") {
            //Remove validation error
            $(".loader").remove();
            $(".form-top-text").show("slow");
            resetPwdForm.slideDown("slow");
            msg = data.error;
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error", true);
            errDiv.html(errorElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          } else {
            //Show the forgotten password again
            //Remove validation error
            $(".loader").remove();
            $(".form-top-text").show("slow");
            verifyModalHeaderTitle.text("Forgotten password?");
            $("#forgotten-password-wrapper-div").slideDown("slow");
            msg = data.error;
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error", true);
            errDiv.html(errorElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          }
        }
      });
    }, time); // timer before action;
  });
};

$(function () {
  resetPwd();
});

/***/ }),

/***/ "./resources/js/modules/review.js":
/*!****************************************!*\
  !*** ./resources/js/modules/review.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/functions */ "./resources/js/helper/functions.js");


var handleRview = function handleRview() {
  $("#user-star").val("");
  $(document).on("click", "#review-form-btn", function (e) {
    e.preventDefault();
    var reviewForm = $("#review-form"),
        errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        formData = reviewForm.serializeArray(),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        errorElement = "",
        msg = "",
        timer = "",
        validationRes = "",
        time = 1200; //hide validation error

    errDiv.slideUp("slow"); //Validate form values

    if ($("#user-star").val() == "") {
      msg = "Please select a star";
      errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error", false);
      errDiv.html(errorElement).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    }

    if ($("#comment").val() == "") {
      msg = "Please enter your comment";
      errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error", false);
      errDiv.html(errorElement).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
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
          Accept: "application/json"
        },
        url: routes.storeUserReview,
        //Blade Global veriable defined in the footer
        data: formData,
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            $(".loader").remove();
            msg = "Thanks for your review, it will appear on the site shortly.";
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success", false);
            reviewForm.trigger("reset");
            formWrapper.html(errorElement);
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            $(".form-top-text").show("slow");
            reviewForm.slideDown("slow");
            msg = data.error;
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error", true);
            errDiv.html(errorElement).slideDown("slow");
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
          }
        }
      });
    }, time); // timer before action;
  });
};

var checkUserRview = function checkUserRview() {
  $(document).on("click", "#leave-review-btn", function () {
    $.ajax({
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      url: routes.checkUserReview,
      //Blade Global veriable defined in the footer
      data: {},
      success: function success(res) {
        if ($.isEmptyObject(res.error)) {
          $("#review-action").val(res.action); //IF OLD REVIEW, POPULATE THE FORM

          if (res.action == "old-review") {
            $("#comment").val(res.data.comment);
            $("#review-stars").attr("value", res.data.star);
            $("#reviewId").attr("value", res.data.id);
            $("#user-star").val(res.data.star);
          } else {
            $("#review-stars").attr("value", 0);
          } //RUN STAR RATING PLUGIN


          $("#review-stars").jsRapStar({
            length: 5,
            step: false,
            starHeight: 54,
            onClick: function onClick(score) {
              $(".err-div").slideUp("slow");
              $("#user-star").val(score.toFixed(2)); //console.log($("#user-star").val());
            }
          });
        } else {
          var errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(res.error, "error", true);
          $(".form-wrapper").html(errorElement);
        }
      }
    });
  });
};

$(function () {
  checkUserRview();
  handleRview();
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
/* harmony import */ var _helper_validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/validations */ "./resources/js/helper/validations.js");
/* harmony import */ var _handle_complete_register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handle-complete-register */ "./resources/js/modules/handle-complete-register.js");




var verifyToken = function verifyToken() {
  var tk = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(2),
      action = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnPartOfUrl)(1),
      tokenData = "",
      msg = "",
      errorElement = "",
      loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
      verifyModal = $("#verifyModal"),
      verifyModalHeaderTitle = $("#verifyModal .modal-title"),
      verifyModalBody = $("#verifyModal .modal-body"),
      timer = "",
      time = 1000; //check if action matches what we are looking for.
  //Redirect to home page

  if (action != "register" && action != "forgotten_pass") {
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.redirect)(routes.homeIndex);
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
          $(".loader").remove();

          if (data.action == "register") {
            verifyModalHeaderTitle.text("Complete Registeration");
            $("#complete-reg-email").val(data.email);
            $("#complete-reg-wrapper-div").slideDown("slow"); //function to handle complete registration form imported, see above.

            (0,_handle_complete_register__WEBPACK_IMPORTED_MODULE_2__.handleCompleteRegister)();
          } else if (data.action == "forgotten_pass") {
            verifyModalHeaderTitle.text("Reset password");
            $("#reset-password-wrapper-div").slideDown("slow");
          } else {
            // if action is not above redirect to home page
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleCloseModal)(verifyModal, routes.homeIndex, true, false, true);
          }
        } else {
          //If there is an error
          $(".loader").remove(); //hide loader

          $(".err-div").slideUp("slow"); // hide any previous error
          //Show relevant div

          if (data.action == "register") {
            verifyModalHeaderTitle.text("Register");
            $("#reg-wrapper-div").slideDown("slow");
          } else if (data.action == "forgotten_pass") {
            verifyModalHeaderTitle.text("Forgotten password?");
            $("#forgotten-password-wrapper-div").slideDown("slow");
          } else {
            // if action is not above redirect to home page
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleCloseModal)(verifyModal, routes.homeIndex, true, false, true);
          } //Show error


          msg = data.error;
          errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error", false);
          $(".err-div").html(errorElement).slideDown("slow");
          (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.hideElement)(4000, $(".err-div"), "slow");
        }
      }
    });
  }, time); // timer before ajax action;
  // Close modal

  $("#verify-modal-close-btn").click(function () {
    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleCloseModal)("", routes.homeIndex, true, false, false);
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

/***/ "./resources/js/modules/work.js":
/*!**************************************!*\
  !*** ./resources/js/modules/work.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/functions */ "./resources/js/helper/functions.js");


var handleSubmitWork = function handleSubmitWork() {
  $("#add-work-form").submit(function (e) {
    e.preventDefault();
    var addWorkFormWrapper = $("#add-work-form-wrapper"),
        errDiv = $(".err-div"),
        files = $("#add-work-form input[type=file]")[0],
        totalFiles = files.files.length,
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        errorElement = "",
        msg = "",
        timer = "",
        time = 1200; //hide validation error

    errDiv.slideUp("slow"); //Ensure file is not empty and is not more than 10

    if (totalFiles <= 0) {
      errDiv.html("<div class='no-border-radius alert alert-danger'><strong>Error!</strong> Please select at least one image file</div>").slideDown("fast");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    }

    if (totalFiles > 10) {
      errDiv.html("<div class='no-border-radius alert alert-danger'><strong>Error!</strong> Maximum 10 images please</div>").slideDown("fast");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    }

    var formData = new FormData(this);

    for (var i = 0; i < totalFiles; i++) {
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
          Accept: "application/json"
        },
        url: routes.adminStore,
        //Blade Global veriable defined in the footer
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function success(data) {
          if ($.isEmptyObject(data.error)) {
            $(".success").remove();
            $(".loader").remove();
            msg = "Work uploaded sucessfully";
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success", false);
            $("#add-work-form").trigger("reset");
            addWorkFormWrapper.html(errorElement);
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            $("#add-work-form").slideDown("slow");
            msg = data.error;
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error", true);
            errDiv.html(errorElement).slideDown("slow");
          }
        }
      });
    }, time); // timer before action;
  });
};

var handleAdminImageHover = function handleAdminImageHover() {
  //ON MOUSE OVER
  $(".admin-work-img").mouseover(function () {
    $(this).parent().find(".admin-work-img-delete-btn").css("display", "block");
    $(this).css("opacity", "0.5");
  });
  $(".admin-work-img-delete-btn").mouseover(function () {
    $(this).css("display", "block");
    $(this).parent().find(".admin-work-img").css("opacity", "0.5");
  }); //ON MOUSE LEAVE

  $(".admin-work-img").mouseleave(function () {
    $(this).parent().find(".admin-work-img-delete-btn").css("display", "none");
    $(this).css("opacity", "1");
  });
};

var handleAdminDeleteWorkBtn = function handleAdminDeleteWorkBtn() {
  $(".admin-work-img-delete-btn").click(function () {
    var btnClicked = $(this),
        workId = btnClicked.data("dir1"),
        publicId = btnClicked.data("dir2"),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        errorElement = "",
        msg = "",
        timer = "",
        timer2 = "",
        time = 1200,
        time2 = 1700,
        deleteWorkFeedback = btnClicked.parent().find(".delete-work-feedback");

    if (window.confirm("Delete this work? there is no go back")) {
      deleteWorkFeedback.html(loader);
      btnClicked.parent().find(".admin-work-img").css("opacity", "0.2").mouseover(function () {
        $(this).css("opacity", "0.2");
        btnClicked.css("display", "none");
      }).mouseleave(function () {
        $(this).css("opacity", "0.2");
        btnClicked.css("display", "none");
      });
      btnClicked.css("display", "none"); //Send work img id and cloudinary publicId for deletion

      var dataTosend = {
        workId: workId,
        publicId: publicId
      };
      clearInterval(timer);
      timer = setTimeout(function () {
        $.ajax({
          method: "POST",
          headers: {
            Accept: "application/json"
          },
          url: routes.adminDeleteWork,
          //Blade Global veriable defined in the footer
          data: dataTosend,
          success: function success(data) {
            if (data.error == "") {
              msg = "Work deleted successful";
              errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success", false);
              deleteWorkFeedback.html(errorElement).css({
                left: "0",
                top: "15%"
              });
              clearInterval(timer2);
              timer2 = setTimeout(function () {
                deleteWorkFeedback.slideUp("slow");
                btnClicked.parent().remove();
              }, time2);
            } else {
              msg = data.error;
              errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "error", true);
              deleteWorkFeedback.html(errorElement).css({
                left: "0",
                top: "15%"
              });
              timer2 = setTimeout(function () {
                deleteWorkFeedback.html("").css({
                  left: "35%",
                  top: "35%"
                });
                btnClicked.parent().find(".admin-work-img").css("opacity", "1").mouseover(function () {
                  $(this).css("opacity", "0.5");
                  btnClicked.css("display", "block");
                }).mouseleave(function () {
                  $(this).css("opacity", "1");
                  btnClicked.css("display", "none");
                });
              }, 3500);
            }
          }
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
    maxFiles: 10
  });
  handleSubmitWork();
  handleAdminImageHover();
  handleAdminDeleteWorkBtn();
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