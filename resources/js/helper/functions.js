const returnBaseUrl = () => {
	return window.location.protocol + "//" + window.location.host + "/";
};
const isObject = (obj) => {
	return Object.prototype.toString.call(obj) === '[object Object]';
};
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
			if (isObject(msg)) {
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
					'<div class="no-border-radius alert alert-danger"><strong>Error! </strong>' +
					msg +
					"</div>"
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
	}, 2000);


}
