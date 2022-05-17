import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    returnPartOfUrl,
    handleCloseModal,
    redirect,
    hideElement,
} from "../helper/functions";
import { validateEmail } from "../helper/validations";
import { handleCompleteRegister } from "./handle-complete-register";
const verifyToken = () => {
    let tk = returnPartOfUrl(2),
        action = returnPartOfUrl(1),
        tokenData = "",
        msg = "",
        errorElement = "",
        loader = returnLoaderSpinner(),
        verifyModal = $("#verifyModal"),
        verifyModalHeaderTitle = $("#verifyModal .modal-title"),
        verifyModalBody = $("#verifyModal .modal-body"),
        timer = "",
        time = 1000;

    //check if action matches what we are looking for.
    //Redirect to home page
    if (action != "register" && action != "forgotten_pass") {
        redirect(routes.homeIndex);
        return;
    }
    //Show spinner and modal
    verifyModalBody.append(loader);
    verifyModal.modal("show");

    //Send token for checking
    tokenData = "Bearer " + tk;

    clearInterval(timer);
    timer = setTimeout(function () {
        $.ajax({
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: tokenData,
            },
            url: routes.verifyToken, //Blade Global veriable defined in the footer
            data: { action: action },
            success: function (data) {
                if ($.isEmptyObject(data.error)) {
                    //If no error
                    $(".loader").remove();
                    if (data.action == "register") {
                        verifyModalHeaderTitle.text("Complete Registeration");
                        $("#complete-reg-email").val(data.email);
                        $("#complete-reg-wrapper-div").slideDown("slow");
                        //function to handle complete registration form imported, see above.
                        handleCompleteRegister();
                    } else if (data.action == "forgotten_pass") {
                        verifyModalHeaderTitle.text("Reset password");
                        $("#reset-password-wrapper-div").slideDown("slow");
                    } else {
                        // if action is not above redirect to home page
                        handleCloseModal(
                            verifyModal,
                            routes.homeIndex,
                            true,
                            false,
                            true
                        );
                    }
                } else {
                    //If there is an error
                    $(".loader").remove(); //hide loader
                    $(".err-div").slideUp("slow"); // hide any previous error
                    //Show relevant div

                    if (data.action == "register") {
                        verifyModalHeaderTitle.text("Register");
                        $("#reg-wrapper-div").slideDown("slow");
                    } else if (data.action == "forgotten_pass") {
                        verifyModalHeaderTitle.text("Forgotten password?");
                        $("#forgotten-password-wrapper-div").slideDown("slow");
                    } else {
                        // if action is not above redirect to home page
                        handleCloseModal(
                            verifyModal,
                            routes.homeIndex,
                            true,
                            false,
                            true
                        );
                    }
                    //Show error
                    msg = data.error;
                    errorElement = handleOutputInFo(msg, "error", false);
                    $(".err-div").html(errorElement).slideDown("slow");
                    hideElement(4000, $(".err-div"), "slow");
                }
            },
        });
    }, time); // timer before ajax action;

    // Close modal
    $("#verify-modal-close-btn").click(function () {
        handleCloseModal("", routes.homeIndex, true, false, false);
    });
};

$(function () {
    //Only run this function if page is equal to verify
    let page = returnPartOfUrl(3);
    if (page == "verify") {
        verifyToken();
    }
});
