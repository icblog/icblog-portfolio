import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    returnPartOfUrl,
    scrollToDiv,
    handleAjaxPaginationInitialPageLoad,
    handleAjaxPaginationNextBtn,
    handleAjaxPaginationPreviousBtn
} from "../../helper/functions";


const handleAddCategoryForm = () => {
    $(document).on("click", "#add-category-form-btn", function (e) {
        e.preventDefault();
        let addCategoryForm = $("#add-category-form"),
            errDiv = $(".err-div"),
            formWrapper = $(".form-wrapper"),
            formData = $("#add-category-form").serializeArray(),
            loader = returnLoaderSpinner(),
            categoryNameValue = $("#category-name").val(),
            infoElement = "",
            msg = "",
            timer = "",
            time = 1200;

        //hide validation error
        errDiv.slideUp("slow");

        if (categoryNameValue == "") {
            infoElement = handleOutputInFo("Category name required", "error");
            errDiv.html(infoElement).slideDown("slow");
            handleErrorOnFocus();
            return;
        }

        formWrapper.prepend(loader);
        addCategoryForm.hide("slow");

        clearInterval(timer);
        timer = setTimeout(function () {
            $.ajax({
                method: "POST",
                headers: {
                    Accept: "application/json",
                    // Authorization:
                    //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NTE1NzU2NjksImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsIm5iZiI6MTY1MTU3NTY3OSwiZXhwIjoxNjUxNTc2MTY5LCJkYXRhIjp7ImVtYWlsIjoiZGRkZGRAZ21haWwuY29tIn19.zsPadnoglvaxGUwlkusKD6TlNCUEMhJKvxqKnOWds3K7-wPF9jilkzTuyCWjRe8P1bHyFLT5HJ0tNDWl72T0GQ",
                },
                url: routes.adminStoreCategory, //Blade Global veriable defined in the footer
                data: formData,
                success: function (data) {
                    if ($.isEmptyObject(data.error)) {
                        time = 1500;
                        msg = "Category added successful, please wait...";
                        infoElement = handleOutputInFo(msg, "success");
                        addCategoryForm.trigger("reset");
                        $(".loader").append(infoElement);
                        clearInterval(timer);
                        timer = setTimeout(function () {
                            $(".success").remove();
                            $(".loader").remove();
                            addCategoryForm.hide("fast");
                            location.reload();
                        }, time);
                    } else {
                        //Remove validation error
                        $(".alert").remove();
                        $(".loader").remove();
                        addCategoryForm.slideDown("slow");
                        msg = data.error;
                        infoElement = handleOutputInFo(msg, "error");
                        errDiv.html(infoElement).slideDown("slow");
                        handleErrorOnFocus();
                    }
                },
            });
        }, time); // timer before action;
    });
};

const handleAdminCategoryEditAndCancelBtn = () => {
    //Hide Save and Cancel btn on page load
    $(".save-category-btn").hide();
    $(".cancel-category-btn").hide();
    $(document).on("click", ".edit-category-btn", function () {
        let inputElement = $(this).parent().parent().find(".admin-all-category-input"),
            deleteCategoryBtn = $(this).parent().find(".delete-category-btn"),
            saveCategoryBtn = $(this).parent().find(".save-category-btn"),
            cancelCategoryBtn = $(this).parent().find(".cancel-category-btn"),
            defaultValue = inputElement.val();
        inputElement.prop("type", "text").focus().val("").val(defaultValue).addClass("admin-all-category-input-active");
        $(this).parent().parent().parent().addClass("admin-category-detail-wrapper-active");
        $(this).hide();
        deleteCategoryBtn.hide();
        saveCategoryBtn.show();
        cancelCategoryBtn.show();

    });

    $(document).on("click", ".cancel-category-btn", function () {

        let inputElement = $(this).parent().parent().find(".admin-all-category-input"),
            editCategoryBtn = $(this).parent().find(".edit-category-btn"),
            deleteCategoryBtn = $(this).parent().find(".delete-category-btn"),
            saveCategoryBtn = $(this).parent().find(".save-category-btn"),
            categoryErrDiv = $(this).parent().parent().parent().find(".category-err-div"),
            defaultValue = inputElement.data("dir");

        inputElement.prop("type", "button").val(defaultValue).removeClass("admin-all-category-input-active");
        $(this).parent().parent().parent().removeClass("admin-category-detail-wrapper-active");
        categoryErrDiv.slideUp("slow");
        $(this).hide();
        saveCategoryBtn.hide();
        deleteCategoryBtn.show();
        editCategoryBtn.show();

    });

}

const handleAdminCategorySaveBtn = () => {
    $(document).on("focus", ".admin-all-category-input", function () {
        $(this).parent().parent().find(".category-err-div").slideUp("slow");

    });

    $(document).on("click", ".save-category-btn", function () {

        let saveCategoryBtn = $(this),
            infoElement = "",
            inputElement = saveCategoryBtn.parent().parent().find(".admin-all-category-input"),
            categoryErrDiv = saveCategoryBtn.parent().parent().parent().find(".category-err-div"),
            categoryDetailUpdatedDatespan = saveCategoryBtn.parent().parent().parent().find(".admin-category-detail-updated-date-span"),
            categoryDetailUpdatedByspan = saveCategoryBtn.parent().parent().parent().find(".admin-category-detail-updated-by-span"),
            deleteCategoryBtn = saveCategoryBtn.parent().find(".delete-category-btn"),
            editCategoryBtn = saveCategoryBtn.parent().find(".edit-category-btn"),
            cancelCategoryBtn = saveCategoryBtn.parent().find(".cancel-category-btn"),
            defaultValue = inputElement.data("dir"),
            newValue = inputElement.val(),
            categoryId = inputElement.data("categoryid"),
            timer = "",
            time = 1200;

        //Check if new value is empty
        if (newValue == "") {
            infoElement = handleOutputInFo("Please fill in a value before saving", "error");
            categoryErrDiv.html(infoElement).slideDown("slow");
            return;
        }

        //Check if new value is same as old value

        if (newValue == defaultValue) {
            infoElement = handleOutputInFo("Please make changes before saving", "error");
            categoryErrDiv.html(infoElement).slideDown("slow");
            return;
        }

        cancelCategoryBtn.hide();
        saveCategoryBtn.text("Saving....");

        //Make ajax call to update category
        clearInterval(timer);
        timer = setTimeout(function () {
            $.ajax({
                method: "POST",
                headers: {
                    Accept: "application/json",
                    //Authorization: tokenData,
                },
                url: routes.adminUpdateCategory, //Blade Global veriable defined in the footer
                data: { categoryId: categoryId, newCategoryname: newValue, defaultValue: defaultValue },
                success: function (data) {
                    if ($.isEmptyObject(data.error)) {
                        time = 1500;
                        saveCategoryBtn.text("Success");
                        clearInterval(timer);
                        timer = setTimeout(function () {
                            inputElement.prop("type", "button").val(newValue).removeClass("admin-all-category-input-active");
                            saveCategoryBtn.parent().parent().parent().removeClass("admin-category-detail-wrapper-active");
                            inputElement.data('dir', newValue);
                            categoryDetailUpdatedDatespan.text(data.updated_at);
                            categoryDetailUpdatedByspan.text(data.updated_by);
                            deleteCategoryBtn.show();
                            editCategoryBtn.show();
                            saveCategoryBtn.html('<span><i class="fas fa-check"></i></span>').hide();
                        }, time);//timer
                    } else {
                        cancelCategoryBtn.show();
                        saveCategoryBtn.html('<span><i class="fas fa-check"></i></span>');
                        //Show error
                        infoElement = handleOutputInFo(data.error, "error");
                        categoryErrDiv.html(infoElement).slideDown("slow");

                    }
                },
            });
        }, time); // timer before ajax action;
    });

}

const handleAdminDeleteCategoryBtn = () => {
    $(document).on("click", ".delete-category-btn", function () {

        let deleteCategoryBtn = $(this),
            infoElement = "",
            inputElement = deleteCategoryBtn.parent().parent().find(".admin-all-category-input"),
            categoryErrDiv = deleteCategoryBtn.parent().parent().parent().find(".category-err-div"),
            editCategoryBtn = deleteCategoryBtn.parent().find(".edit-category-btn"),
            defaultValue = inputElement.data("dir"),
            categoryId = inputElement.data("categoryid"),
            resultPerPage = $(".next-pre-btn-wrapper").data("resultperpage"),
            timer = "",
            time = 1200;
        categoryErrDiv.slideUp("slow");
        if (window.confirm(`Delete category (${defaultValue}) ? please note this can not be undone`)) {

            editCategoryBtn.hide();
            deleteCategoryBtn.text("Deleting....");

            //Make ajax call to update category
            clearInterval(timer);
            timer = setTimeout(function () {
                $.ajax({
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        //Authorization: tokenData,
                    },
                    url: routes.adminDeleteCategory, //Blade Global veriable defined in the footer
                    data: { categoryId: categoryId },
                    success: function (data) {
                        if ($.isEmptyObject(data.error)) {
                            time = 1500;
                            deleteCategoryBtn.removeClass("btn-danger").addClass("btn-success").text("Success");
                            clearInterval(timer);
                            timer = setTimeout(function () {
                                deleteCategoryBtn.parent().parent().parent().remove();
                                //Check how many result left on the page and if is zero reload the page for ne records
                                let newResultPerPageValue = resultPerPage - 1;
                                // console.log(newResultPerPageValue);
                                if (newResultPerPageValue == 0) {
                                    location.reload();
                                } else {
                                    //update resultPerPage value

                                    $(".next-pre-btn-wrapper").data("resultperpage", newResultPerPageValue);
                                }

                            }, time);//timer
                        } else {
                            editCategoryBtn.show();
                            deleteCategoryBtn.removeClass("btn-success").addClass("btn-danger").html('<span><i class="fas fa-trash"></i></span>');
                            //Show error
                            infoElement = handleOutputInFo(data.error, "error");
                            categoryErrDiv.html(infoElement).slideDown("slow");

                        }
                    },
                });
            }, time); // timer before ajax action;

        }//End window confirmation


    });

}

const returnHtmlOutPut = (result) => {

    let htmloutput = "",
        categoriesWrapperDiv = $("#admin-all-category-wrapper");
    if (result.err) {
        categoriesWrapperDiv.html("<p>" + result.res + "</p>");
        return;
    }

    if (result.res.length > 0) {
        $.each(result.res, function (key, value) {
            htmloutput += '<div class="admin-category-detail-wrapper p-2 box-shadow mb-4">';
            htmloutput += '<div class="input-group">';
            htmloutput += `<input type="button" class="form-control admin-all-category-input" value="${value.name}" data-dir="${value.name}" data-categoryid="${value.id}">`;
            htmloutput += '<div class="input-group-append">';
            htmloutput += '<button class="btn btn-primary edit-category-btn" type="button"><span><i class="fas fa-edit"></i></span></button>';
            htmloutput += '<button class="btn btn-danger delete-category-btn" type="button"><span><i class="fas fa-trash"></i></span></button>';
            htmloutput += '<button class="btn btn-success save-category-btn" type="button"><span><i class="fas fa-check"></i></span></button>';
            htmloutput += '<button class="btn btn-warning cancel-category-btn" type="button"><span><i class="fas fa-times"></i></span></button>';
            htmloutput += '</div>';
            htmloutput += '</div>';
            htmloutput += '<div class="category-err-div"></div>';
            htmloutput += `<p>
            Created date: <span class="admin-detail-value-span">${value.created_at}</span><br/> 
            Created by: <span class="admin-detail-value-span">${value.createdby_name}</span><br/>
            Updated date: <span class="admin-detail-value-span">${value.updated_at == value.created_at ? "--" : value.updated_at}</span><br/>
            Updated by: <span class="admin-detail-value-span">${value.updatedby_name == null ? "--" : value.updatedby_name}</span><br/>
            </p>`;
            htmloutput += '</div>';

        });
    } else {
        htmloutput += '<p class="text-center">There is currently no category, please add one using the form above thank you.</p>';
    }

    categoriesWrapperDiv.html(htmloutput);
    $(".next-pre-btn-wrapper").data("resultperpage", result.resultPerPage);
    $(".save-category-btn").hide();
    $(".cancel-category-btn").hide();
}

const handleCategoryPagination = () => {
    let initialPageLoadObject = "",
        output = "",
        intialPageNumber = "",
        intialLastPageNumber = "",
        categoriesWrapperDiv = $("#admin-all-category-wrapper"),
        loader = returnLoaderSpinner(),
        ajaxEndPoint = routes.adminLoadmoreCategory;

    initialPageLoadObject = handleAjaxPaginationInitialPageLoad();
    intialPageNumber = initialPageLoadObject.intialPageNumber;
    intialLastPageNumber = initialPageLoadObject.intialLastPageNumber;

    $(".next-btn").click(function () {
        categoriesWrapperDiv.html(loader);
        scrollToDiv($(".form-wrapper"));
        handleAjaxPaginationNextBtn(returnHtmlOutPut, ajaxEndPoint, intialPageNumber, intialLastPageNumber);
    });

    $(".pre-btn").click(function () {
        categoriesWrapperDiv.html(loader);
        scrollToDiv($(".form-wrapper"));
        handleAjaxPaginationPreviousBtn(returnHtmlOutPut, ajaxEndPoint, intialPageNumber, intialLastPageNumber);
    });



};

$(function () {
    //Run this code only on category page
    let page = returnPartOfUrl(1);
    if (page == "category") {
        //Run above function to handle the form
        handleAddCategoryForm();
        handleAdminCategoryEditAndCancelBtn();
        handleAdminCategorySaveBtn();
        handleAdminDeleteCategoryBtn();
        handleCategoryPagination();

    }
});