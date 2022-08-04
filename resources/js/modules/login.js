import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    inputTypeToggler,
    redirect,
    returnPartOfUrl
} from "../helper/functions";


const handleLogin = () => {

    inputTypeToggler(".pwd-btn", ".login-pwd", "click", "text", true);
    $(document).on("click", ".login-form-btn", function (e) {
        e.preventDefault();
        let loginForm = $(".login-form"),
            errDiv = $(".err-div"),
            formWrapper = $(".form-wrapper"),
            formData = $(".login-form").serializeArray(),
            loader = returnLoaderSpinner(),
            errorElement = "",
            msg = "",
            timer = "",
            timer2 = "",
            time2 = 1700,
            time = 1200;

        //hide validation error
        errDiv.slideUp("slow");


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
                url: routes.handleLoginForm, //Blade Global veriable defined in the footer
                data: formData,
                success: function (data) {
                    if ($.isEmptyObject(data.error)) {
                        msg = "Login successful, please wait...";
                        errorElement = handleOutputInFo(msg, "success");
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
                                redirect("blog");
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
                        errorElement = handleOutputInFo(msg, "error");
                        errDiv.html(errorElement).slideDown("slow");

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

    if (page == "login") {
        //Run above function to handle the form
        handleLogin();
    }
});

