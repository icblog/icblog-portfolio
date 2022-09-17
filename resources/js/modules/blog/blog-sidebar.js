import {
    returnPartOfUrl,
    handleCategorySearchFilter
} from "../../helper/functions";

const handleBlogSidebarCategorySearch = () => {
    let inputElement = $("#sidebar-search-category-input"),
        categoryWrapper = $('.sidebar-category-link-wrapper'),
        clearBtn = $(".sidebar-search-category-icon-times");
    handleCategorySearchFilter(inputElement, categoryWrapper, clearBtn);
}


$(function () {

    //Run this code only on blog page
    let page = returnPartOfUrl(2);

    if (page == "post" || page == "category" || page == "blog") {
        handleBlogSidebarCategorySearch();
    }

});
