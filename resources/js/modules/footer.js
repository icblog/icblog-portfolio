import { scrollToDiv } from "../helper/functions";

const handleBackToTopBtn = () => {
    $(".back-to-top-btn").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

}

$(function () {
    handleBackToTopBtn();

});