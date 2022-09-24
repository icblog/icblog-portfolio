const toggleMenu = () => {
	$("#small-screen-open-menu-btn").click(function () {
		$("header .header-content-wrapper .middle-content-wrapper").css(
			"minWidth",
			"100%"
		);
	});
	$("#small-screen-close-menu-btn").click(function () {
		$("header .header-content-wrapper .middle-content-wrapper").css(
			"minWidth",
			"0"
		);
	});
};

const toggleStickyHeader = () => {
	let stickyOffset = $("#main-header").offset().top,
		header = $("#main-header");
	$(window).scroll(function () {
		let scroll = $(window).scrollTop();

		if (scroll > stickyOffset) {
			header.addClass("header-sticky");
			$("#main-header");
		} else {
			header.removeClass("header-sticky");
		}
	});

}

$(document).ready(function () {
	toggleMenu();
	toggleStickyHeader();
});
