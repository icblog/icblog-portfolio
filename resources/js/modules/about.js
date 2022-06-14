const handleUpAndDownArrow = (e) =>{
    $(".about-h5-intro").click(function () {
  
       
       if($(this).hasClass("opened")){
          $(this).parent().find(".about-arrow-down").show();
          $(this).parent().find(".about-arrow-up").hide();
          $(this).css({"color": "#000000","borderBottomColor": "#3466F6"}).removeClass("opened");
         
       }else{
          $(this).parent().find(".about-arrow-up").show();
          $(this).parent().find(".about-arrow-down").hide();
          $(this).css({"color": "#565656","borderBottomColor": "#565656"}).addClass("opened");
          
       } 
      
    });
}



$(function () {
   handleUpAndDownArrow();
  
});
