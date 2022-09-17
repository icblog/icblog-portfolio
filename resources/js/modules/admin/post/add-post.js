import {
    returnLoaderSpinner,
    handleOutputInFo,
    handleErrorOnFocus,
    returnPartOfUrl,
    scrollToDiv,
    redirect
} from "../../../helper/functions";

const handleAddPostForm = () => {
    let addPostForm = $("#add-post-form");
    //Reset form on page load
    addPostForm.trigger("reset");
    addPostForm.submit(function (e) {
        e.preventDefault();
        let errDiv = $(".err-div"),
            formWrapper = $(".form-wrapper"),
            formData = new FormData(this),
            loader = returnLoaderSpinner(),
            title = $("#title"),
            files = $("#add-post-form input[type=file]")[0],
            totalFiles = files.files.length,
            selectedCategories = $("#admin-post-category-select"),
            postBody = $("#postbody"),
            infoElement = "",
            msg = "",
            timer = "",
            time = 1200;

        //hide validation error
        errDiv.slideUp("slow");

        //Image file is optional, only validate if user attempt to upload
        if (totalFiles > 0) {
            //Maximum number of files allowed is 10
            if (totalFiles > 10) {
                infoElement = handleOutputInFo("Maximum 10 images please thank you", "error");
                errDiv.html(infoElement).slideDown("slow");
                scrollToDiv(formWrapper);
                handleErrorOnFocus();
                return;
            } else {
                //Add images files to form data
                for (let i = 0; i < totalFiles; i++) {
                    formData.append("files" + i, files.files[i]);
                }
                formData.append("totalFiles", totalFiles);
            }

        }//End if image is greater than 0

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



        formWrapper.prepend(loader);
        addPostForm.hide("slow");

        clearInterval(timer);
        timer = setTimeout(function () {
            $.ajax({
                method: "POST",
                headers: {
                    Accept: "application/json",
                    // Authorization:
                    //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NTE1NzU2NjksImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsIm5iZiI6MTY1MTU3NTY3OSwiZXhwIjoxNjUxNTc2MTY5LCJkYXRhIjp7ImVtYWlsIjoiZGRkZGRAZ21haWwuY29tIn19.zsPadnoglvaxGUwlkusKD6TlNCUEMhJKvxqKnOWds3K7-wPF9jilkzTuyCWjRe8P1bHyFLT5HJ0tNDWl72T0GQ",
                },
                url: routes.adminStorepost, //Blade Global veriable defined in the footer
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    if ($.isEmptyObject(data.error)) {
                        time = 1500;
                        msg = "Post created successful, please wait...";
                        infoElement = handleOutputInFo(msg, "success");
                        addPostForm.trigger("reset");
                        $(".loader").append(infoElement);
                        clearInterval(timer);
                        timer = setTimeout(function () {
                            $(".success").remove();
                            $(".loader").remove();
                            addPostForm.hide("fast");
                            //location.reload();
                            redirect(`admin/allpost`, false);
                        }, time);
                    } else {
                        //Remove validation error
                        $(".alert").remove();
                        $(".loader").remove();
                        addPostForm.slideDown("slow");
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

    let page = returnPartOfUrl(1);
    //If page is addpost
    if (page == "addpost") {
        $(".add-post-input-images").imageUploader({
            imagesInputName: "files",
            maxSize: 2 * 1024 * 1024,
            maxFiles: 10,
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

        //Handle the form submit
        handleAddPostForm();
    }//End If page is addpost
});
