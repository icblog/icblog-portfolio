import {
   scrollToBottomOfDiv
} from "../helper/functions";


const handleAboutTabContent = () => {

   $(".tab_content").hide();
   //$(".tab_content:first").show();

   /* if in tab mode */
   $(".about-h5-intro").click(function () {

      let activeTab = $(this).attr("rel");
      $("#" + activeTab).removeClass("tab_content");
      $(".tab_content").hide();
      $("#" + activeTab).addClass("tab_content");

      //Reset tab heading arror to default style
      $(".about-arrow-down").show();
      $(".about-arrow-up").hide();

      //Hide and show up and down arrows
      if ($(this).hasClass("active")) {
         $(this).find(".about-arrow-up").hide();
         $(this).find(".about-arrow-down").show();
         $(".about-h5-intro").removeClass("active");

         $("#" + activeTab).slideUp("slow");

      } else {

         $(this).find(".about-arrow-up").show();
         $(this).find(".about-arrow-down").hide();
         $(".about-h5-intro").removeClass("active");
         $(this).addClass("active");
         $("#" + activeTab).slideDown("slow");
         // scrollToBottomOfDiv($("#" + activeTab));


      }


      $(".tab_drawer_heading").removeClass("d_active");
      $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");

   });




}



$(function () {

   handleAboutTabContent();

});
