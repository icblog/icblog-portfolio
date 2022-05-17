import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    inputTypeToggler,
    returnPartOfUrl,
} from "../helper/functions";
import { validateEmail } from "../helper/validations";

const resetPwd = () => {
    inputTypeToggler(".pwd-btn", "#reset-pwd", "click", "text", true);
    $(document).on("click", "#reset-password-form-btn", function (e) {
        e.preventDefault();
        let resetPwdForm = $("#reset-password-form"),
            errDiv = $(".err-div"),
            verifyModalHeaderTitle = $("#verifyModal .modal-title"),
            formWrapper = $(".form-wrapper"),
            formData = resetPwdForm.serializeArray(),
            loader = returnLoaderSpinner(),
            errorElement = "",
            msg = "",
            timer = "",
            timer2 = "",
            validationRes = "",
            time = 1200,
            time2 = 1700,
            tokenData = "",
            tk = returnPartOfUrl(2);

        //hide validation error
        errDiv.slideUp("slow");

        //Validate form values
        // validationRes = validateEmail($("#forgotten-pwd-email"));

        // if (validationRes != true) {
        //     errDiv.html(validationRes).slideDown("slow");
        //     handleErrorOnFocus();
        //     return;
        // }
        //Send token for checking
        tokenData = "Bearer " + tk;

        $(".form-top-text").hide("slow");
        resetPwdForm.hide("slow");
        formWrapper.append(loader);

        clearInterval(timer);
        timer = setTimeout(function () {
            $.ajax({
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: tokenData,
                },
                url: routes.authUpdate, //Blade Global veriable defined in the footer
                data: formData,
                success: function (data) {
                    if (data.error == "" && data.action == "") {
                        msg = "Password reset successful";
                        errorElement = handleOutputInFo(msg, "success", false);
                        resetPwdForm.trigger("reset");
                        $(".loader").append(errorElement);
                        clearInterval(timer2);
                        timer2 = setTimeout(function () {
                            //Show the login form
                            $(".success").remove();
                            $(".loader").remove();
                            $("#reset-password-wrapper-div").slideUp("slow");
                            verifyModalHeaderTitle.text("Login securely");
                            $("#login-wrapper-div").slideDown("slow");
                        }, time2);
                    } else if (data.action == "" && data.error != "") {
                        //Remove validation error
                        $(".loader").remove();
                        $(".form-top-text").show("slow");
                        resetPwdForm.slideDown("slow");
                        msg = data.error;
                        errorElement = handleOutputInFo(msg, "error", true);
                        errDiv.html(errorElement).slideDown("slow");

                        handleErrorOnFocus();
                    } else {
                        //Show the forgotten password again
                        //Remove validation error
                        $(".loader").remove();
                        $(".form-top-text").show("slow");
                        verifyModalHeaderTitle.text("Forgotten password?");
                        $("#forgotten-password-wrapper-div").slideDown("slow");
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
    resetPwd();
});
