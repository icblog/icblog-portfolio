import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    inputTypeToggler,
} from "../helper/functions";
import { validateEmail } from "../helper/validations";

export const handleCompleteRegister = () => {
    inputTypeToggler(".pwd-btn", "#pwd", "click", "text", true);

    $(document).on("click", "#complete-register-form-btn", function (e) {
        e.preventDefault();
        let completeRegForm = $("#complete-register-form"),
            errDiv = $(".err-div"),
            formWrapper = $(".form-wrapper"),
            loader = returnLoaderSpinner(),
            infoElement = "",
            msg = "",
            timer = "",
            validationRes = "",
            time = 1200;

        //hide validation error
        errDiv.hide("slow");

        //Validate form values
        // validationRes = validateEmail($("#registerFormEmail"));

        // if (validationRes != true) {
        //     errDiv.html(validationRes).show("slow");
        //     handleErrorOnFocus();
        //     return;
        // }

        $(":disabled").prop("disabled", false);
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
                url: routes.authStore, //Blade Global veriable defined in the footer
                data: formData,
                success: function (data) {
                    if ($.isEmptyObject(data.error)) {
                        $(".loader").remove();
                        msg = "Registration successful";
                        infoElement = handleOutputInFo(msg, "info", false);
                        completeRegForm.trigger("reset");
                        formWrapper.html(infoElement);
                    } else {
                        //Remove validation error
                        errDiv.slideUp("slow");
                        $(".loader").remove();
                        $(".form-top-text").show("slow");
                        completeRegForm.slideDown("slow");
                        $(":disabled").prop("disabled", true);
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
