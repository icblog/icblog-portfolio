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
/* harmony export */   "returnPartOfUrl": () => (/* binding */ returnPartOfUrl),
/* harmony export */   "scrollToDiv": () => (/* binding */ scrollToDiv)
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
  $("select").change(function () {
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
var scrollToDiv = function scrollToDiv(divToScrollTo) {
  divToScrollTo.scrollTop(0);
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
/***/ (() => {

var handleUpAndDownArrow = function handleUpAndDownArrow(e) {
  $(".about-h5-intro").click(function () {
    if ($(this).hasClass("opened")) {
      $(this).parent().find(".about-arrow-down").show();
      $(this).parent().find(".about-arrow-up").hide();
      $(this).css({
        "color": "#000000",
        "borderBottomColor": "#3466F6"
      }).removeClass("opened");
    } else {
      $(this).parent().find(".about-arrow-up").show();
      $(this).parent().find(".about-arrow-down").hide();
      $(this).css({
        "color": "#565656",
        "borderBottomColor": "#565656"
      }).addClass("opened");
    }
  });
};

$(function () {
  handleUpAndDownArrow();
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
    $(".contact-link").show("slow");
  });
};

var handleContactForm = function handleContactForm() {
  $(document).on("click", "#contact-form-btn", function (e) {
    e.preventDefault();
    var contactForm = $("#contact-form"),
        errDiv = $(".err-div"),
        formWrapper = $(".form-wrapper"),
        formData = contactForm.serializeArray(),
        loader = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.returnLoaderSpinner)(),
        errorElement = "",
        msg = "",
        timer = "",
        validationRes = "",
        time = 1200; //hide validation error

    errDiv.slideUp("slow"); //Validate form values

    validationRes = (0,_helper_validations__WEBPACK_IMPORTED_MODULE_1__.validateElementEmpty)($("#c-name"), "*Please provide your name");

    if (validationRes != true) {
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)($("#contactModal"));
      errDiv.html(validationRes).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    }

    validationRes = (0,_helper_validations__WEBPACK_IMPORTED_MODULE_1__.validateEmail)($("#c-email"));

    if (validationRes != true) {
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)($("#contactModal"));
      errDiv.html(validationRes).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    }

    validationRes = (0,_helper_validations__WEBPACK_IMPORTED_MODULE_1__.validateElementEmpty)($("#c-phone"), "*Please provide a phone number");

    if (validationRes != true) {
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)($("#contactModal"));
      errDiv.html(validationRes).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
      return;
    }

    validationRes = (0,_helper_validations__WEBPACK_IMPORTED_MODULE_1__.validateElementEmpty)($("#c-message"), "*Please provide your message");

    if (validationRes != true) {
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.scrollToDiv)($("#contactModal"));
      errDiv.html(validationRes).slideDown("slow");
      (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleErrorOnFocus)();
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
            errorElement = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_0__.handleOutputInFo)(msg, "success", false);
            contactForm.trigger("reset");
            formWrapper.html(errorElement);
          } else {
            //Remove validation error
            $(".alert").remove();
            $(".loader").remove();
            $(".form-top-text").show("slow");
            contactForm.slideDown("slow");
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
  handleContactLink();
  handleContactForm();
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