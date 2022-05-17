import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    inputTypeToggler,
    redirect,
} from "../helper/functions";
import { validateEmail } from "../helper/validations";

const login = () => {
    inputTypeToggler(".pwd-btn", "#login-pwd", "click", "text", true);
    $(document).on("click", "#login-form-btn", function (e) {
        e.preventDefault();
        let loginForm = $("#login-form"),
            errDiv = $(".err-div"),
            formWrapper = $(".form-wrapper"),
            authModalHeaderTitle = $("#authModal .modal-title"),
            formData = loginForm.serializeArray(),
            loader = returnLoaderSpinner(),
            errorElement = "",
            msg = "",
            timer = "",
            timer2 = "",
            validationRes = "",
            time2 = 1700,
            time = 1200;

        //hide validation error
        errDiv.slideUp("slow");

        //Validate form values
        // validationRes = validateEmail($("#registerFormEmail"));

        // if (validationRes != true) {
        //     errDiv.html(validationRes).slideDown("slow");
        //     handleErrorOnFocus();
        //     return;
        // }

        formWrapper.append(loader);
        $(".auth-back-btn").hide("slow");
        $(".form-top-text").hide("slow");
        loginForm.hide("slow");

        clearInterval(timer);
        timer = setTimeout(function () {
            $.ajax({
                method: "POST",
                headers: {
                    Accept: "application/json",
                    // Authorization:
                    //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NTE1NzU2NjksImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsIm5iZiI6MTY1MTU3NTY3OSwiZXhwIjoxNjUxNTc2MTY5LCJkYXRhIjp7ImVtYWlsIjoiZGRkZGRAZ21haWwuY29tIn19.zsPadnoglvaxGUwlkusKD6TlNCUEMhJKvxqKnOWds3K7-wPF9jilkzTuyCWjRe8P1bHyFLT5HJ0tNDWl72T0GQ",
                },
                url: routes.authLogin, //Blade Global veriable defined in the footer
                data: formData,
                success: function (data) {
                    if ($.isEmptyObject(data.error)) {
                        msg = "Login successful, please wait...";
                        errorElement = handleOutputInFo(msg, "success", false);
                        loginForm.trigger("reset");
                        $(".loader").append(errorElement);
                        clearInterval(timer2);
                        timer2 = setTimeout(function () {
                            //Show the login form
                            $(".success").remove();
                            $(".loader").remove();
                            $(".login-wrapper-div").slideUp("slow");
                            //If user is admin redirect to admin dashboad
                            //Else show the review form
                            if (data.isAdmin) {
                                redirect("admin/dashboard");
                            } else {
                                redirect("reviews");
                            } //end if is admin
                        }, time2);
                    } else {
                        //Remove validation error
                        $(".alert").remove();
                        $(".loader").remove();
                        $(".auth-back-btn").show("slow");
                        $(".form-top-text").show("slow");
                        loginForm.slideDown("slow");
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
    login();
});
