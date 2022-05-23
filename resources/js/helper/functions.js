const returnBaseUrl = () => {
	return window.location.protocol + "//" + window.location.host + "/";
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

export const handleOutputInFo = (msg, type, isMsgArr = false) => {
	switch (type) {
		case "success":
			return (
				'<div class="no-border-radius alert alert-success"><strong>Success! </strong>' +
				msg +
				"</div>"
			);

		case "error":
			if (isMsgArr) {
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

export const handleErrorOnFocus = () => {
	$("input").focus(() => {
		$(".err-div").slideUp("slow");
	});

	$("textarea").focus(() => {
		$(".err-div").slideUp("slow");
	});

	$("select").change(() => {
		$(".err-div").slideUp("slow");
	});

	$("input[type=file]").change(() => {
		$(".err-div").slideUp("slow");
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


export const scrollToDiv = (divToScrollTo) =>{
	              
                    divToScrollTo.scrollTop(0);
}
