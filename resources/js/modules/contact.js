import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    scrollToDiv
} from "../helper/functions";
import { validateEmail, validateElementEmpty } from "../helper/validations";

const handleContactLink = (e) =>{
    $(document).on("click", "#contact-link", function (e) {
    e.preventDefault();
    $("#contactModal").modal("show");
    });

}

const handleContactForm = () => {
    $(document).on("click", "#contact-form-btn", function (e) {
        e.preventDefault();
        let contactForm = $("#contact-form"),
            errDiv = $(".err-div"),
            formWrapper = $(".form-wrapper"),
            formData = contactForm.serializeArray(),
            loader = returnLoaderSpinner(),
            errorElement = "",
            msg = "",
            timer = "",
            validationRes = "",
            time = 1200;

        //hide validation error
        errDiv.slideUp("slow");

        //Validate form values
        validationRes = validateElementEmpty($("#c-name"),"*Please provide your name");
        
       if (validationRes != true) {
            scrollToDiv($("#contactModal"));
            errDiv.html(validationRes).slideDown("slow");
            
            handleErrorOnFocus();
            return;
        }

         validationRes = validateEmail($("#c-email"));

        if (validationRes != true) {
            scrollToDiv($("#contactModal"));
            errDiv.html(validationRes).slideDown("slow");
            handleErrorOnFocus();
            return;
        }

         validationRes = validateElementEmpty($("#c-phone"),"*Please provide a phone number");
        
       if (validationRes != true) {
            scrollToDiv($("#contactModal"));
            errDiv.html(validationRes).slideDown("slow");
            
            handleErrorOnFocus();
            return;
        }


         validationRes = validateElementEmpty($("#c-message"),"*Please provide your message");
        
       if (validationRes != true) {
            scrollToDiv($("#contactModal"));
            errDiv.html(validationRes).slideDown("slow");
            
            handleErrorOnFocus();
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
                            "Please check your email and follow the instruction to continue thank you.";
                        errorElement = handleOutputInFo(msg, "info", false);
                        contactForm.trigger("reset");
                        formWrapper.html(errorElement);
                    } else {
                        //Remove validation error
                        $(".alert").remove();
                        $(".loader").remove();
                        $(".form-top-text").show("slow");
                        contactForm.slideDown("slow");
                        msg = data.error;
                        errorElement = handleOutputInFo(msg, "error", true);
                        errDiv.html(errorElement).slideDown("slow");

                        handleErrorOnFocus();
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
