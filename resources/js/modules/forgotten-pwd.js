import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    returnPartOfUrl
} from "../helper/functions";
import { validateEmail } from "../helper/validations";

const handleForgottenPwdForm = () => {
    let regemail = localStorage.getItem("regemail");
    if (regemail) {
        $("#forgotten-pwd-email-input").val(regemail);
    }
    $(document).on("click", "#forgotten-pwd-form-btn", function (e) {
        e.preventDefault();
        let forgottenPwdForm = $("#forgotten-pwd-form"),
            errDiv = $(".err-div"),
            formWrapper = $(".form-wrapper"),
            formData = forgottenPwdForm.serializeArray(),
            loader = returnLoaderSpinner(),
            infoElement = "",
            msg = "",
            timer = "",
            validationRes = "",
            time = 1200;

        //hide validation error
        errDiv.slideUp("slow");

        //Validate form values
        validationRes = validateEmail($("#forgotten-pwd-email-input"));

        if (validationRes != true) {
            errDiv.html(validationRes).slideDown("slow");
            handleErrorOnFocus();
            return;
        }


        $(".form-top-text").hide("slow");
        forgottenPwdForm.hide("slow");
        formWrapper.append(loader);

        clearInterval(timer);
        timer = setTimeout(function () {
            $.ajax({
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                url: routes.handleForgottenPassForm, //Blade Global veriable defined in the footer
                data: formData,
                success: function (data) {
                    //Remove validation error
                    $(".loader").remove();

                    if ($.isEmptyObject(data.error)) {
                        //Remove user email from localstorage if its there.
                        if (regemail) {
                            localStorage.removeItem("regemail");
                        }

                        msg =
                            "Please check your email and follow the instruction to continue thank you.";
                        infoElement = handleOutputInFo(msg, "info", false);
                        forgottenPwdForm.trigger("reset");
                        formWrapper.html(infoElement);
                    } else {

                        $(".form-top-text").show("slow");
                        forgottenPwdForm.slideDown("slow");
                        msg = data.error;
                        infoElement = handleOutputInFo(msg, "error", true);
                        errDiv.html(infoElement).slideDown("slow");

                        handleErrorOnFocus();
                    }
                },
            });
        }, time); // timer before action;
    });
};

$(function () {
    //Run this code only on forgotten pass page
    let page = returnPartOfUrl(1);
    if (page == "forgotten-pass") {
        //Run above function to handle the form
        handleForgottenPwdForm();
    }

});
