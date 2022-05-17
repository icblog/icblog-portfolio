import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
} from "../helper/functions";
import { validateEmail } from "../helper/validations";

const forgottenPwd = () => {
    $(document).on("click", "#forgotten-pwd-form-btn", function (e) {
        e.preventDefault();
        let forgottenPwdForm = $("#forgotten-pwd-form"),
            errDiv = $(".err-div"),
            formWrapper = $(".form-wrapper"),
            formData = forgottenPwdForm.serializeArray(),
            loader = returnLoaderSpinner(),
            errorElement = "",
            msg = "",
            timer = "",
            validationRes = "",
            time = 1200;

        //hide validation error
        errDiv.slideUp("slow");

        //Validate form values
        validationRes = validateEmail($("#forgotten-pwd-email"));

        if (validationRes != true) {
            errDiv.html(validationRes).slideDown("slow");
            handleErrorOnFocus();
            return;
        }

        $(".auth-back-btn").hide("slow");
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
                url: routes.authIndex, //Blade Global veriable defined in the footer
                data: formData,
                success: function (data) {
                    if ($.isEmptyObject(data.error)) {
                        $(".loader").remove();
                        msg =
                            "Please check your email and follow the instruction to continue thank you.";
                        errorElement = handleOutputInFo(msg, "info", false);
                        forgottenPwdForm.trigger("reset");
                        formWrapper.html(errorElement);
                    } else {
                        //Remove validation error
                        $(".loader").remove();
                        $(".auth-back-btn").show("slow");
                        $(".form-top-text").show("slow");
                        forgottenPwdForm.slideDown("slow");
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
    forgottenPwd();
});
