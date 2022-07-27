import {
    returnLoaderSpinner,
    handleOutputInFo,
    redirectToHomePage,
} from "../helper/functions";

const logout = () => {
    $(document).on("click", "#logout-link", function (e) {
        e.preventDefault();
        let logoutModalHeaderTitle = $("#logoutModal .modal-title"),
            logoutModalBody = $("#logoutModal .modal-body"),
            loader = returnLoaderSpinner(),
            errorElement = "",
            msg = "",
            timer = "",
            timer2 = "",
            time2 = 1700,
            time = 1200;
        $("#logoutModal").modal("show");

        logoutModalBody.html(loader);

        clearInterval(timer);
        timer = setTimeout(function () {
            $.ajax({
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                url: routes.logoutIndex, //Blade Global veriable defined in the footer
                data: {},
                success: function (data) {
                    if ($.isEmptyObject(data.error)) {
                        msg = "Login successful, please wait...";
                        errorElement = handleOutputInFo(msg, "success", false);
                        $(".loader").append(errorElement);
                        clearInterval(timer2);
                        timer2 = setTimeout(function () {
                            //redirect to home page
                            $(".success").remove();
                            $(".loader").remove();
                            redirectToHomePage();
                        }, time2);
                    } else {
                        $(".loader").remove();
                        msg = data.error;
                        errorElement = handleOutputInFo(msg, "error", true);
                        logoutModalBody.html(errorElement);
                    }
                },
            });
        }, time); // timer before action;
    });
};

$(function () {
    logout();
});
