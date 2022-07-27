import {
    returnLoaderSpinner,
    handleOutputInFo,
    returnPartOfUrl,
    handleCloseModal,
    redirect

} from "../helper/functions";

const redirectAfterVerify = (action, infoElement, errorStatus) => {

    let timer2 = "",
        time2 = 5000,
        token = returnPartOfUrl(2);
    $(".loader").append(infoElement);
    clearInterval(timer2);
    timer2 = setTimeout(function () {
        $(".success").remove();
        $(".loader").remove();
        //redirect user base on the action
        //check if there is an errorStatus if true
        switch (action) {
            case "register":
                if (errorStatus) {
                    redirect(routes.registerIndex, true);
                } else {
                    redirect(routes.showCompleteRegisterForm, true);
                }
                break;
            case "forgotten_pass":
                if (errorStatus) {
                    redirect(routes.forgottenPass, true);
                } else {
                    redirect("reset-pass/" + token);
                }
                break;
            default:
                redirect(routes.homeIndex, true);
                return;
        }


    }, time2);


}

const verifyToken = () => {
    let tk = returnPartOfUrl(2),
        action = returnPartOfUrl(1),
        tokenData = "",
        msg = "",
        infoElement = "",
        loader = returnLoaderSpinner(),
        verifyModal = $("#verifyModal"),
        verifyModalHeaderTitle = $("#verifyModal .modal-title"),
        verifyModalBody = $("#verifyModal .modal-body"),
        timer = "",
        time = 1200;

    //check if action matches what we are looking for.
    //Redirect to home page
    if (action != "register" && action != "forgotten_pass") {
        redirect(routes.homeIndex, true);
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
                    msg = "Redirecting";
                    infoElement = handleOutputInFo(msg, "info", false);
                    redirectAfterVerify(action, infoElement, false);//Find this function above

                } else {

                    //Show error
                    msg = data.error;
                    infoElement = handleOutputInFo(msg, "error", false);
                    redirectAfterVerify(action, infoElement, true);// Find this function above
                }
            },
        });
    }, time); // timer before ajax action;

    // Close modal
    $("#verify-modal-close-btn").click(function () {
        handleCloseModal("", routes.blogIndex, true, false, false);
    });
};

$(function () {
    //Only run this function if page is equal to verify
    let page = returnPartOfUrl(3);
    if (page == "verify") {
        verifyToken();
    }
});
