import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    returnPartOfUrl
} from "../../helper/functions";

const handleSearchBtn = (e) => {
    $(document).on("click", ".search-btn", function () {
        $("#search-modal").modal("show");
        $(".search-btn").hide("slow");
    });

    $(document).on("click", ".close-search-modal", function () {
        $(".search-btn").show("slow");
        $("#main-search-input").val("");
        $("#main-search-result-wrapper").html("");

    });
}

const handleMainSearhFormSubmit = () => {

    let typingTimer,
        ajaxResultTimer,
        doneTypingInterval = 700,
        mainSearchForm = $("#main-search-form");

    //Prevent default submit
    mainSearchForm.submit(function (e) {
        e.preventDefault();
    });
    //On search input key up

    $("#main-search-input").keyup(function () {
        clearTimeout(typingTimer);
        if ($(this).val().trim().length > 2) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }//End if input val is > 2
    });

    //user is "finished typing," do ajax call
    function doneTyping() {
        let errDiv = $(".err-div-search-form"),
            resultsWrapper = $("#main-search-result-wrapper"),
            formData = mainSearchForm.serializeArray(),
            loader = returnLoaderSpinner(),
            infoElement = "",
            msg = "";

        errDiv.slideUp("slow");
        resultsWrapper.html("");
        resultsWrapper.html(loader);
        $.ajax({
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            url: routes.blogSearch, //Blade Global veriable defined in the footer
            data: formData,
            success: function (data) {
                clearInterval(ajaxResultTimer);
                ajaxResultTimer = setTimeout(function () {
                    if ($.isEmptyObject(data.error)) {
                        resultsWrapper.html("");
                        let htmloutput = "";
                        console.log(data.result.length);
                        if (data.result.length > 0) {
                            htmloutput += `<p class="text-center number-result-found-p">${data.result.length > 1 ? "(" + data.result.length + ") results" : "(" + data.result.length + ") result"} found</p>`;
                            $.each(data.result, function (key, value) {
                                htmloutput += `<a href="/blog/${value.slug}">${value.title}</a>`;
                            });

                        } else {
                            htmloutput += '<p class="text-center">Sorry no result found, please try again thank you.</p>';
                        }// End result length

                        resultsWrapper.html(htmloutput);

                    } else {
                        //Remove validation error
                        $(".alert").remove();
                        resultsWrapper.html("");
                        msg = data.error;
                        infoElement = handleOutputInFo(msg, "error");
                        errDiv.html(infoElement).slideDown("slow");
                        handleErrorOnFocus("err-div-search-form");
                    }

                }, 600);

            },
        });
    }//End fuction  doneTyping



}

$(function () {
    handleSearchBtn();
    handleMainSearhFormSubmit();

});