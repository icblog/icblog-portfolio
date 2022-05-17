import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
} from "../helper/functions";
import { validateEmail } from "../helper/validations";

const register1 = () => {
    $(document).on("click", "#register-form1-btn", function (e) {
        e.preventDefault();
        let regForm = $("#registerForm1"),
            errDiv = $(".err-div"),
            formWrapper = $(".form-wrapper"),
            formData = regForm.serializeArray(),
            loader = returnLoaderSpinner(),
            errorElement = "",
            msg = "",
            timer = "",
            validationRes = "",
            time = 1200;

        //hide validation error
        errDiv.slideUp("slow");

        //Validate form values
        validationRes = validateEmail($("#registerFormEmail"));

        if (validationRes != true) {
            errDiv.html(validationRes).slideDown("slow");
            handleErrorOnFocus();
            return;
        }

        formWrapper.append(loader);
        $(".auth-back-btn").hide("slow");
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
                url: routes.authIndex, //Blade Global veriable defined in the footer
                data: formData,
                success: function (data) {
                    if ($.isEmptyObject(data.error)) {
                        $(".loader").remove();

                        msg =
                            "Please check your email and follow the instruction to continue thank you.";
                        errorElement = handleOutputInFo(msg, "info", false);
                        regForm.trigger("reset");
                        formWrapper.html(errorElement);
                    } else {
                        //Remove validation error
                        $(".alert").remove();
                        $(".loader").remove();
                        $(".auth-back-btn").show("slow");
                        $(".form-top-text").show("slow");
                        regForm.slideDown("slow");
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
    register1();
});
