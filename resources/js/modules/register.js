import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    inputTypeToggler,
    redirect,
    returnPartOfUrl
} from "../helper/functions";
import { validateEmail } from "../helper/validations";

const handleInitialRegister = () => {
    $(document).on("click", "#initial-register-form-btn", function (e) {
        e.preventDefault();
        let regForm = $("#initial-register-form"),
            errDiv = $(".err-div"),
            formWrapper = $(".form-wrapper"),
            formData = regForm.serializeArray(),
            loader = returnLoaderSpinner(),
            infoElement = "",
            msg = "",
            timer = "",
            validationRes = "",
            time = 1200;

        //hide validation error
        errDiv.slideUp("slow");

        //Validate form values
        validationRes = validateEmail($("#initial-register-email-input"));

        if (validationRes != true) {
            errDiv.html(validationRes).slideDown("slow");
            handleErrorOnFocus();
            return;
        }

        formWrapper.append(loader);
        $(".form-top-text").hide("slow");
        regForm.hide("slow");

        clearInterval(timer);
        timer = setTimeout(function () {
            $.ajax({
                method: "POST",
                headers: {
                    Accept: "application/json",
                    // Authorization:
                    //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NTE1NzU2NjksImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsIm5iZiI6MTY1MTU3NTY3OSwiZXhwIjoxNjUxNTc2MTY5LCJkYXRhIjp7ImVtYWlsIjoiZGRkZGRAZ21haWwuY29tIn19.zsPadnoglvaxGUwlkusKD6TlNCUEMhJKvxqKnOWds3K7-wPF9jilkzTuyCWjRe8P1bHyFLT5HJ0tNDWl72T0GQ",
                },
                url: routes.initialRegister, //Blade Global veriable defined in the footer
                data: formData,
                success: function (data) {
                    if ($.isEmptyObject(data.error)) {
                        $(".loader").remove();
                        //Temp store the user reg email in local storge
                        localStorage.setItem("regemail", $("#initial-register-email-input").val());
                        msg =
                            "Please check your email and follow the instruction to continue thank you.";
                        infoElement = handleOutputInFo(msg, "info", false);
                        regForm.trigger("reset");
                        formWrapper.html(infoElement);
                    } else {
                        //Remove validation error
                        $(".alert").remove();
                        $(".loader").remove();
                        $(".form-top-text").show("slow");
                        regForm.slideDown("slow");
                        msg = data.error;
                        infoElement = handleOutputInFo(msg, "error", false);
                        errDiv.html(infoElement).slideDown("slow");

                        handleErrorOnFocus();
                    }
                },
            });
        }, time); // timer before action;
    });
};


//###################### COMPLETE REGISTRATION #########################
//######################################################################


const handleCompleteRegister = () => {

    inputTypeToggler(".pwd-btn", "#pwd", "click", "text", true);
    $(document).on("click", "#complete-register-form-btn", function (e) {
        e.preventDefault();
        //get user reg email from local storage
        let regemail = localStorage.getItem("regemail");
        //Redirect to home page if reg email is not there.
        if (!regemail) {
            redirect(routes.homeIndex, true);
            return;
        }

        //Set user reg in hidden input
        $("#complete-reg-email").val(regemail);
        //Set some form variables
        let completeRegForm = $("#complete-register-form"),
            errDiv = $(".err-div"),
            formWrapper = $(".form-wrapper"),
            loader = returnLoaderSpinner(),
            infoElement = "",
            msg = "",
            timer = "",
            timer2 = "",
            time2 = 1700,
            //validationRes = "",
            time = 1200;

        //hide validation error
        errDiv.hide("slow");

        //Validate form values

        let formData = completeRegForm.serializeArray();
        formWrapper.append(loader);
        $(".form-top-text").hide("slow");
        completeRegForm.slideUp("slow");

        clearInterval(timer);
        timer = setTimeout(function () {
            $.ajax({
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                url: routes.storeCompleteRegister, //Blade Global veriable defined in the footer
                data: formData,
                success: function (data) {
                    if ($.isEmptyObject(data.error)) {
                        completeRegForm.trigger("reset");
                        msg = "Registration successful";
                        infoElement = handleOutputInFo(msg, "success", false);
                        $(".loader").append(infoElement);
                        clearInterval(timer2);
                        timer2 = setTimeout(function () {
                            //Show the login form
                            $(".success").remove();
                            $(".loader").remove();
                            //Remove regemail form local storage
                            localStorage.removeItem("regemail");
                            redirect(routes.blogIndex, true);
                        }, time2);
                    } else {
                        //Remove validation error
                        errDiv.slideUp("slow");
                        $(".loader").remove();
                        $(".form-top-text").show("slow");
                        completeRegForm.slideDown("slow");
                        msg = data.error;
                        infoElement = handleOutputInFo(msg, "error", true);
                        errDiv.html(infoElement).show("slow");

                        handleErrorOnFocus();
                    }
                },
            });
        }, time); // timer before action;
    });
};

$(function () {
    //Run this code only on reset pass page
    let page = returnPartOfUrl(1);

    if (page == "register") {
        //Run above function to handle the form
        handleInitialRegister();
    } else if (page == "complete-register") {
        handleCompleteRegister();
    }
});
