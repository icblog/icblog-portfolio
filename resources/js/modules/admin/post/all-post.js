import {
    returnLoaderSpinner,
    handleOutputInFo,
    returnPartOfUrl,
    scrollToDiv,
    handleAjaxPaginationInitialPageLoad,
    handleAjaxPaginationNextBtn,
    handleAjaxPaginationPreviousBtn,
    redirect
} from "../../../helper/functions";

const returnHtmlOutPut = (result) => {

    let htmloutput = "",
        postWrapperDiv = $("#all-post-wrapper");
    if (result.err) {
        postWrapperDiv.html("<p>" + result.res + "</p>");
        return;
    }

    if (result.res.length > 0) {
        $.each(result.res, function (key, value) {
            htmloutput += '<div class="admin-post-detail-wrapper p-2 box-shadow mb-4">';
            htmloutput += '<div class="text-right">';
            htmloutput += `<button class="btn btn-primary edit-post-btn no-border-radius" type="button" data-dir="${value.id}"><span><i class="fas fa-edit"></i></span></button>`;
            htmloutput += `<button class="btn btn-danger delete-post-btn no-border-radius" type="button"><span><i class="fas fa-trash"></i></span></button>`;
            htmloutput += '</div>';
            htmloutput += `<h4>${value.title}</h4>`;
            htmloutput += `<p>
            Status: <span class="admin-detail-value-span ${value.status == 'saved' ? 'text-danger' : 'text-success'}"><strong>${value.status}</strong></span><br/>
            Created date: <span class="admin-detail-value-span">${value.created_at}</span><br/> 
            Created by: <span class="admin-detail-value-span">${value.createdby_name}</span><br/>
            Updated date: <span class="admin-detail-value-span">${value.updated_at == value.created_at ? "--" : value.updated_at}</span><br/>
            Updated by: <span class="admin-detail-value-span">${value.updatedby_name == null ? "--" : value.updatedby_name}</span><br/>
            </p>`;
            htmloutput += '</div>';

        });
    } else {
        htmloutput += '<p class="text-center">There is currently no post.</p>';
    }

    postWrapperDiv.html(htmloutput);
    $(".next-pre-btn-wrapper").data("resultperpage", result.resultPerPage);

}

const handlePostPagination = () => {
    let initialPageLoadObject = "",
        output = "",
        intialPageNumber = "",
        intialLastPageNumber = "",
        postWrapperDiv = $("#all-post-wrapper"),
        loader = returnLoaderSpinner(),
        ajaxEndPoint = routes.adminLoadMorePost;

    initialPageLoadObject = handleAjaxPaginationInitialPageLoad();
    intialPageNumber = initialPageLoadObject.intialPageNumber;
    intialLastPageNumber = initialPageLoadObject.intialLastPageNumber;

    $(".next-btn").click(function () {
        postWrapperDiv.html(loader);
        scrollToDiv(postWrapperDiv);
        handleAjaxPaginationNextBtn(returnHtmlOutPut, ajaxEndPoint, intialPageNumber, intialLastPageNumber);
    });

    $(".pre-btn").click(function () {
        postWrapperDiv.html(loader);
        scrollToDiv(postWrapperDiv);
        handleAjaxPaginationPreviousBtn(returnHtmlOutPut, ajaxEndPoint, intialPageNumber, intialLastPageNumber);
    });



};
const handleEditPostButtonClicked = () => {
    $(document).on("click", ".edit-post-btn", function () {
        let postId = $(this).data("dir");
        redirect(`admin/editpost/${postId}`, false);
    });
}

const handleAdminDeletePostBtn = () => {
    $(document).on("click", ".delete-post-btn", function () {
        let deletePostBtn = $(this),
            postHasImages = deletePostBtn.data("posthasimages"),
            cloudinaryFolderName = deletePostBtn.data("cloudinaryfoldername"),
            postid = deletePostBtn.data("postid"),
            postTitle = deletePostBtn.parent().parent().find(".post-title").text(),
            infoElement = "",
            postErrDiv = deletePostBtn.parent().parent().find(".post-error-div"),
            resultPerPage = $(".next-pre-btn-wrapper").data("resultperpage"),
            timer = "",
            time = 1200;

        postErrDiv.slideUp("slow");

        if (window.confirm(`Delete post with title (${postTitle}) ? please note this can not be undone`)) {
            deletePostBtn.text("Deleting....");

            //Make ajax call to update category
            clearInterval(timer);
            timer = setTimeout(function () {
                $.ajax({
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        //Authorization: tokenData,
                    },
                    url: routes.adminDeletepost, //Blade Global veriable defined in the footer
                    data: { postId: postid, postHasImages: postHasImages, cloudinaryFolderName: cloudinaryFolderName },
                    success: function (data) {
                        if ($.isEmptyObject(data.error)) {
                            time = 1500;
                            deletePostBtn.removeClass("btn-danger").addClass("btn-success").text("Success");
                            clearInterval(timer);
                            timer = setTimeout(function () {
                                deletePostBtn.parent().parent().remove();
                                //Check how many result left on the page and if is zero reload the page for ne records
                                let newResultPerPageValue = resultPerPage - 1;

                                if (newResultPerPageValue == 0) {
                                    location.reload();
                                } else {
                                    //update resultPerPage value

                                    $(".next-pre-btn-wrapper").data("resultperpage", newResultPerPageValue);
                                }

                            }, time);//timer
                        } else {

                            deletePostBtn.removeClass("btn-success").addClass("btn-danger").html('<span><i class="fas fa-trash"></i></span>');
                            //Show error
                            infoElement = handleOutputInFo(data.error, "error");
                            postErrDiv.html(infoElement).slideDown("slow");

                        }
                    },
                });
            }, time); // timer before ajax action;

        }//End window confirmation


    });

}


$(function () {

    let page = returnPartOfUrl(1);

    //If page is all post
    if (page == "allpost") {
        //Handle post pagination
        handlePostPagination();
        handleEditPostButtonClicked();
        handleAdminDeletePostBtn();
    }
});