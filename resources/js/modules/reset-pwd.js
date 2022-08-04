import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    inputTypeToggler,
    returnPartOfUrl,
    redirect
} from "../helper/functions";

const handleResetPwdForm = () => {
    inputTypeToggler(".pwd-btn", "#reset-pwd", "click", "text", true);
    $(document).on("click", "#reset-password-form-btn", function (e) {
        e.preventDefault();
        let resetPwdForm = $("#reset-password-form"),
            errDiv = $(".err-div"),
            formWrapper = $(".form-wrapper"),
            formData = resetPwdForm.serializeArray(),
            loader = returnLoaderSpinner(),
            infoElement = "",
            msg = "",
            timer = "",
            timer2 = "",
            time = 1200,
            time2 = 4000,
            tokenData = "",
            tk = returnPartOfUrl(1);


        //hide validation error
        errDiv.slideUp("slow");


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
                url: routes.resetPassUpdate, //Blade Global veriable defined in the footer
                data: formData,
                success: function (data) {
                    if (data.error == "" && data.action == "") {
                        msg = "Password reset successful";
                        infoElement = handleOutputInFo(msg, "success");
                        resetPwdForm.trigger("reset");
                        $(".loader").append(infoElement);
                        clearInterval(timer2);
                        timer2 = setTimeout(function () {
                            //Show the login form
                            $(".success").remove();
                            $(".loader").remove();
                            //Remove user email from localstorage if its there.
                            if (localStorage.getItem("regemail")) {
                                localStorage.removeItem("regemail");
                            }
                            //Redirect user to login page
                            redirect(routes.loginIndex, true);
                        }, time2);
                    } else if (data.error != "" && data.action == "") {
                        $(".loader").remove();
                        $(".form-top-text").show("slow");
                        resetPwdForm.slideDown("slow");
                        msg = data.error;
                        infoElement = handleOutputInFo(msg, "error");
                        errDiv.html(infoElement).slideDown("slow");
                        handleErrorOnFocus();
                    } else {

                        msg = data.error;
                        infoElement = handleOutputInFo(msg, "error");
                        resetPwdForm.trigger("reset");
                        $(".loader").append(infoElement);
                        clearInterval(timer2);
                        timer2 = setTimeout(function () {
                            //Show the login form
                            $(".success").remove();
                            $(".loader").remove();
                            redirect(routes.forgottenPass, true);
                        }, time2);
                    }
                },
            });
        }, time); // timer before action;
    });
};

$(function () {
    //Run this code only on reset pass page
    let page = returnPartOfUrl(2);

    if (page == "reset-pass") {
        //Run above function to handle the form
        handleResetPwdForm();
    }
});
