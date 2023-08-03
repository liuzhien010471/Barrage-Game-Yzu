$(document).ready(function(){

    $("#down-var").click(function(){
        // $("#down-var").animate({width:"toggle"},1000,
        // function() {
        //     // 動畫結束後判斷是否顯示或隱藏
        //     if ($(this).is(":visible")) {
        //         // 若可見則不進行任何動作
        //     } else {
        //         // 若不可見則隱藏
        //         $(this).css("display", "none");
        //     }
        // });
        $("#down-var").animate({width:"toggle"},1000);
        console.log($("#down-var"));
    });
    

});