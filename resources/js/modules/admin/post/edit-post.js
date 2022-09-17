import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    returnPartOfUrl,
    scrollToDiv
} from "../../../helper/functions";

const handleRemoveImageBtn = () => {
    $(".uploaded-image .delete-image").click(function () {
        let imgPublicId = $(this).parent().find("input[type='hidden']").val(),
            imgPublicIdArray = $("#post-images-tobe-deleted").data("imgpublicid");
        imgPublicIdArray.push(imgPublicId);

        // alert(imgPublicId);

    });

}


const handleEditPostForm = () => {
    let editPostForm = $("#edit-post-form");
    //Reset form on page load

    editPostForm.submit(function (e) {
        e.preventDefault();
        let errDiv = $(".err-div"),
            formWrapper = $(".form-wrapper"),
            title = $("#title"),
            formData = new FormData(this),
            files = $("#edit-post-form input[type=file]")[0],
            preloadedFiles = editPostForm.find('input[name^="old"]'),
            totalOldFiles = preloadedFiles.length,
            totalNewFiles = files.files.length,
            preloadedFilesToBeDeleted = $("#post-images-tobe-deleted").data("imgpublicid"),
            totalPreloadedFilesToBeDeleted = preloadedFilesToBeDeleted.length,
            loader = returnLoaderSpinner(),
            selectedCategories = $("#admin-post-category-select"),
            postBody = $("#postbody"),
            infoElement = "",
            msg = "",
            timer = "",
            time = 1200;

        //hide validation error
        errDiv.slideUp("slow");

        //Image file is optional, only validate if user attempt to upload
        if (totalNewFiles + totalOldFiles > 10) {
            infoElement = handleOutputInFo("Maximum 10 images please thank you", "error");
            errDiv.html(infoElement).slideDown("slow");
            scrollToDiv(formWrapper);
            handleErrorOnFocus();
            return;
        }

        //Add new images files to form data if totalNewFiles > 0
        if (totalNewFiles > 0) {

            for (let i = 0; i < totalNewFiles; i++) {

                formData.append("files" + i, files.files[i]);
            }
        }


        //Apend totalNewfiles to from data
        formData.append("totalNewFiles", totalNewFiles);
        formData.append("preloadedFilesToBeDeleted[]", preloadedFilesToBeDeleted);
        formData.append("totalPreloadedFilesToBeDeleted", totalPreloadedFilesToBeDeleted);


        if (title.val().trim() == "") {
            infoElement = handleOutputInFo("Post title required", "error");
            title.addClass("input-error");
            errDiv.html(infoElement).slideDown("slow");
            scrollToDiv(formWrapper);
            handleErrorOnFocus();
            return;
        } else {
            title.removeClass("input-error");
        }

        if (selectedCategories.get(0).selectedIndex == -1) {
            infoElement = handleOutputInFo("Please select at least on category", "error");
            $(".easySelect").addClass("input-error");
            errDiv.html(infoElement).slideDown("slow");
            scrollToDiv(formWrapper);
            handleErrorOnFocus();
            return;
        } else {
            $(".easySelect").removeClass("input-error");

        }

        if (postBody.val().trim() == "") {
            infoElement = handleOutputInFo("Post body required", "error");
            $(".md-toolbar").addClass("input-error");
            $(".md-editor").addClass("input-error");
            errDiv.html(infoElement).slideDown("slow");
            scrollToDiv(formWrapper);
            handleErrorOnFocus();
            return;
        } else {
            $(".md-toolbar").removeClass("input-error");
            $(".md-editor").removeClass("input-error");
        }

        if ($('input[name="saveorpublish"]:checked').length == 0) {
            infoElement = handleOutputInFo("Select either to save or published post", "error");
            errDiv.html(infoElement).slideDown("slow");
            scrollToDiv(formWrapper);
            $(".saveorpublish").addClass("input-error");
            return;
        } else {
            $(".saveorpublish").removeClass("input-error");
        }

        // console.log(formData);
        // return

        formWrapper.prepend(loader);
        editPostForm.hide("slow");

        clearInterval(timer);
        timer = setTimeout(function () {
            $.ajax({
                method: "POST",
                headers: {
                    Accept: "application/json",
                    // Authorization:
                    //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NTE1NzU2NjksImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsIm5iZiI6MTY1MTU3NTY3OSwiZXhwIjoxNjUxNTc2MTY5LCJkYXRhIjp7ImVtYWlsIjoiZGRkZGRAZ21haWwuY29tIn19.zsPadnoglvaxGUwlkusKD6TlNCUEMhJKvxqKnOWds3K7-wPF9jilkzTuyCWjRe8P1bHyFLT5HJ0tNDWl72T0GQ",
                },
                url: routes.adminUpdatepost, //Blade Global veriable defined in the footer
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    if ($.isEmptyObject(data.error)) {
                        time = 1500;
                        msg = "Post updated successfully, please wait...";
                        infoElement = handleOutputInFo(msg, "success");
                        editPostForm.trigger("reset");
                        $(".loader").append(infoElement);
                        clearInterval(timer);
                        timer = setTimeout(function () {
                            $(".success").remove();
                            $(".loader").remove();
                            editPostForm.hide("fast");
                            location.reload();
                        }, time);
                    } else {
                        //Remove validation error
                        $(".alert").remove();
                        $(".loader").remove();
                        editPostForm.slideDown("slow");
                        msg = data.error;
                        infoElement = handleOutputInFo(msg, "error");
                        errDiv.html(infoElement).slideDown("slow");
                        scrollToDiv(formWrapper);
                        handleErrorOnFocus();
                    }
                },
            });
        }, time); // timer before action;
    });

    //Category multiselect on click
    //Hide errors
    $(".styledSelect").click(function () {
        $(".easySelect").removeClass("input-error");
        $(".err-div").slideUp("slow");
    })

    //Radio button checked
    //Hide error
    $('input[name="saveorpublish"]').focus(function () {
        $(".saveorpublish").removeClass("input-error");
    })
};





$(function () {

    let page = returnPartOfUrl(2);
    //If page is Edit post
    if (page == "editpost") {
        //set proloaded image url and id
        let imgUrls = $(".edit-post-input-images").data("imgurls"),
            imgPublicIds = $(".edit-post-input-images").data("imgpublicids"),
            preloaded = [];
        if (imgUrls != "undefined" && imgUrls.length > 0) {
            for (let i = 0; i < imgUrls.length; i++) {
                preloaded.push({ id: imgPublicIds[i], src: imgUrls[i] });

            }
        }

        $(".edit-post-input-images").imageUploader({
            imagesInputName: "files",
            maxSize: 2 * 1024 * 1024,
            maxFiles: 10,
            preloaded: preloaded,
            preloadedInputName: 'old'
        });

        $("#admin-post-category-select").easySelect({
            buttons: true, // 
            search: true,
            placeholder: 'Choose category',
            placeholderColor: '#524781',
            selectColor: '#524781',
            itemTitle: 'categories selected',
            showEachItem: true,
            width: '100%',
            dropdownMaxHeight: '450px',
        });

        $('#postbody').markdownEditor({
            // imageUpload: true, // Activate the option
            //uploadPath: 'upload.php',
            preview: true,
            onPreview: function (content, callback) {
                callback(marked(content));
            }

        });

        //set preSelected category option
        let preSelectCategories = $("#admin-post-category-select").data("catids");
        $('.mulpitply_checkbox_style').each(function () {
            // check if the current item value is in the array
            if ($.inArray($(this).val(), preSelectCategories) != -1) {
                // trigger a click event in order to preselect the item
                $(this).trigger('click');
            }
        });

        handleRemoveImageBtn();
        handleEditPostForm();
    }//END IF PAGE IS ADMIN EDIT


});