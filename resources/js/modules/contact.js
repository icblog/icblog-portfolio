import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    scrollToDiv
} from "../helper/functions";
import { validateEmail, validateElementEmpty } from "../helper/validations";

const handleContactLink = (e) => {
    $(document).on("click", ".contact-link", function (e) {
        e.preventDefault();
        $("#contactModal").modal("show");
        $(".contact-link").hide("slow");
    });

    $(document).on("click", ".close-contact-modal", function () {
        $(".contact-link").show("slow");
        //location.reload();
    });



}

const handleContactForm = () => {
    $(document).on("click", "#contact-form-btn", function (e) {
        e.preventDefault();
        let contactForm = $("#contact-form"),
            errDiv = $(".err-div-contact-form"),
            formWrapper = $(".form-wrapper-contact-form"),
            formData = contactForm.serializeArray(),
            loader = returnLoaderSpinner(),
            infoElement = "",
            msg = "",
            timer = "",
            validationRes = "",
            time = 1200;

        //hide validation error
        errDiv.slideUp("slow");

        //Validate form values
        validationRes = validateElementEmpty($("#c-name"), "*Please provide your name");

        if (validationRes != true) {
            scrollToDiv($("#contactModal"));
            errDiv.html(validationRes).slideDown("slow");

            handleErrorOnFocus("err-div-contact-form");
            return;
        }

        validationRes = validateEmail($("#c-email"));

        if (validationRes != true) {
            scrollToDiv($("#contactModal"));
            errDiv.html(validationRes).slideDown("slow");
            handleErrorOnFocus("err-div-contact-form");
            return;
        }

        validationRes = validateElementEmpty($("#c-phone"), "*Please provide a phone number");

        if (validationRes != true) {
            scrollToDiv($("#contactModal"));
            errDiv.html(validationRes).slideDown("slow");

            handleErrorOnFocus("err-div-contact-form");
            return;
        }


        validationRes = validateElementEmpty($("#c-message"), "*Please provide your message");

        if (validationRes != true) {
            scrollToDiv($("#contactModal"));
            errDiv.html(validationRes).slideDown("slow");

            handleErrorOnFocus("err-div-contact-form");
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
                    Accept: "application/json",
                },
                url: routes.contactIndex, //Blade Global veriable defined in the footer
                data: formData,
                success: function (data) {
                    if ($.isEmptyObject(data.error)) {
                        $(".loader").remove();

                        msg =
                            "Thank you for getting intouch, I will get back to you soon.";
                        infoElement = handleOutputInFo(msg, "success");
                        contactForm.trigger("reset");
                        formWrapper.html(infoElement);
                    } else {
                        //Remove validation error
                        $(".alert").remove();
                        $(".loader").remove();
                        $(".form-top-text").show("slow");
                        contactForm.slideDown("slow");
                        msg = data.error;
                        infoElement = handleOutputInFo(msg, "error");
                        errDiv.html(infoElement).slideDown("slow");

                        handleErrorOnFocus("err-div-contact-form");
                    }
                },
            });
        }, time); // timer before action;
    });
};

$(function () {
    handleContactLink();
    handleContactForm();
});
