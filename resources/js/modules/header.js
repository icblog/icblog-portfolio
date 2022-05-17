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

$(document).ready(function () {
	toggleMenu();
});
