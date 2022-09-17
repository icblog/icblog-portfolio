const returnBaseUrl = () => {
	return window.location.protocol + "//" + window.location.host + "/";
};
const isObject = (obj) => {
	return Object.prototype.toString.call(obj) === '[object Object]';
};

const isArray = (what) => {
	return Object.prototype.toString.call(what) === '[object Array]';
}
export const redirect = (url, external) => {
	let ext = external || false;
	if (ext) {
		window.location = url;
	} else {
		window.location = returnBaseUrl() + url;
	}
};

export const redirectToHomePage = () => {
	let homeUrl = returnBaseUrl();
	window.location = homeUrl;
};

export const inputTypeToggler = (
	handle,
	target,
	eventType,
	typeChange,
	changeIcon
) => {
	let targetType = $(target).prop("type");
	$(handle).on(eventType, function () {
		if ($(target).prop("type") !== typeChange) {
			$(target).prop("type", typeChange);
			if (changeIcon) {
				$(handle + " .fa")
					.removeClass("fa-eye")
					.addClass("fa-eye-slash");
			}
		} else {
			$(target).prop("type", targetType);
			if (changeIcon) {
				$(handle + " .fa")
					.removeClass("fa-eye-slash")
					.addClass("fa-eye");
			}
		}
	});
};

export const returnPartOfUrl = (partNumber) => {
	//This function return a part of the url string
	let url = $(location).attr("href").replace(/\/+$/, ""), //rtrim `/`
		parts = url.split("/"),
		urlpart = parts[parts.length - partNumber];
	return urlpart;
};

export const handleOutputInFo = (msg, type) => {
	switch (type) {
		case "success":
			return (
				'<div class="no-border-radius alert alert-success"><strong>Success! </strong>' +
				msg +
				"</div>"
			);

		case "error":
			if (isObject(msg) || isArray(msg)) {
				let errElement = "<ul>";
				$.each(msg, function (key, value) {
					errElement += "<li>*" + value + "</li>";
				});
				errElement += "</ul>";
				return (
					'<div class="no-border-radius alert alert-danger"><strong>Error! </strong>' +
					errElement +
					"</div>"
				);
			} else {
				return (
					'<div class="no-border-radius alert alert-danger"><strong>Error! </strong><ul><li>*' +
					msg +
					"</ul></li></div>"
				);
			}

		case "info":
			return (
				'<div class="no-border-radius alert alert-secondary"><strong>Info! </strong>' +
				msg +
				"</div>"
			);

		default:
			return "";
	}
};

export const handleErrorOnFocus = (errDiv = "err-div") => {
	$("input").focus(() => {
		$(`.${errDiv}`).slideUp("slow");
	});

	$("textarea").focus(() => {
		$(`.${errDiv}`).slideUp("slow");
		$(".md-toolbar").removeClass("input-error");
		$(".md-editor").removeClass("input-error");
	});

	$("select").change(() => {
		$(`.${errDiv}`).slideUp("slow");
	});

	$("input[type=file]").change(() => {
		$(`.${errDiv}`).slideUp("slow");
	});

};

export const returnLoaderSpinner = () => {
	return '<div class="loader text-align"><div class="fa-3x"><i class="fas fa-spinner fa-spin"></i></div><p>Please wait...</p></div>';
};

export const handleCloseModal = (
	modalId,
	redirectLink = "",
	redirect = false,
	refresh = false,
	isCustomBtn = false
) => {
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

export const hideElement = (timeTohide, elementToHide, speedToHideIt) => {
	let timer = "";
	clearInterval(timer);
	timer = setTimeout(function () {
		elementToHide.slideUp(speedToHideIt);
	}, timeTohide);
};


export const scrollToDiv = (divToScrollTo) => {
	$('html, body').animate({
		scrollTop: divToScrollTo.offset().top
	}, 500);


}


export const handleAjaxPaginationInitialPageLoad = () => {

	let intialPageNumber = $(".next-pre-btn-wrapper").data('dir1'),
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
	}
}


export const handleAjaxPaginationNextBtn = (returnHtmlOutPut, ajaxEndPoint, intialPageNumber, intialLastPageNumber) => {
	let pageNumber = $(".next-pre-btn-wrapper").data('dir1'),
		totalResultCount = $(".next-pre-btn-wrapper").data('dir3'),
		nextBtn = $(".next-btn"),
		preBtn = $(".pre-btn"),
		time = 600,
		timer = "",
		newPageNumber = pageNumber + 1;
	//hide both buttons
	nextBtn.hide();
	preBtn.hide();

	//update page number in view
	$(".next-pre-btn-wrapper").data('dir1', newPageNumber);

	//make ajax call
	clearInterval(timer);
	timer = setTimeout(function () {
		let postData = { 'pageNumber': newPageNumber, 'totalResultCount': totalResultCount };
		$.ajax({
			url: ajaxEndPoint,
			type: 'POST',
			data: postData,
			success: function (data) {

				if ($.isEmptyObject(data.error)) {
					if (intialLastPageNumber > intialPageNumber) {
						preBtn.show();
					}
					if (intialLastPageNumber != newPageNumber) {
						nextBtn.show();
					}
					let result = {
						"err": false,
						"res": data.res,
						"resultPerPage": data.resultPerPage
					}
					returnHtmlOutPut(result);

				} else {
					let result = {
						"err": true,
						"res": data.error
					}
					returnHtmlOutPut(result);

				}//end if error
			}
		}); //end ajax
	}, time); //end timer


}//handleAjaxPaginationNextBtn


export const handleAjaxPaginationPreviousBtn = (returnHtmlOutPut, ajaxEndPoint, intialPageNumber, intialLastPageNumber) => {
	let pageNumber = $(".next-pre-btn-wrapper").data('dir1'),
		totalResultCount = $(".next-pre-btn-wrapper").data('dir3'),
		nextBtn = $(".next-btn"),
		preBtn = $(".pre-btn"),
		time = 600,
		timer = "",
		newPageNumber = pageNumber - 1;
	//hide both buttons
	nextBtn.hide();
	preBtn.hide();

	//update page number in view
	$(".next-pre-btn-wrapper").data('dir1', newPageNumber);

	//make ajax call
	clearInterval(timer);
	timer = setTimeout(function () {
		let postData = { 'pageNumber': newPageNumber, 'totalResultCount': totalResultCount };
		$.ajax({
			url: ajaxEndPoint,
			type: 'POST',
			data: postData,
			success: function (data) {

				if ($.isEmptyObject(data.error)) {

					preBtn.show();

					if (newPageNumber == intialPageNumber) {
						preBtn.hide();
					}
					if (intialLastPageNumber != newPageNumber) {
						nextBtn.show();
					}
					let result = {
						"err": false,
						"res": data.res,
						"resultPerPage": data.resultPerPage
					}
					returnHtmlOutPut(result);

				} else {
					let result = {
						"err": true,
						"res": data.error
					}
					returnHtmlOutPut(result);

				}//end if error
			}
		}); //end ajax
	}, time); //end timer


}//handleAjaxPaginationPreviousBtn


export const handleCategorySearchFilter = (inputElement, categoryWrapper, clearBtn) => {
	inputElement.keyup(function () {
		categoryWrapper.hide();
		let searchedWord = $(this).val().trim().toUpperCase().trim();
		//Show clear button
		if (searchedWord == "") {
			clearBtn.hide();
		} else {
			clearBtn.show();
		}
		// Loop through all list items, and hide those who don't match the search query

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