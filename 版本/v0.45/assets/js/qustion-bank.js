$(document).ready(function(){
    var qusBank = $(".qus-bank");
    const qustionInBank = $("#qustion-in-bank");

    qusBank.click(function(){
        qusBank.each(function(){
            qusBank.removeClass("qusbank-choose");
        });
        $(this).addClass("qusbank-choose");
    });


});