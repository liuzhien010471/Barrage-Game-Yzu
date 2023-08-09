$(document).ready(function(){
    const left = {
        open: true,
        dom: $(".left-con")
    };
    const right = {
        open: true,
        dom: $(".right-con")
    };
    const qus = {
        open: true,
        dom: $(".qus-con")
    };
    const down = {
        open: true,
        dom: $(".down-con")
    };

    left["dom"].click(function(event){
        if ($(event.target).is("#left-put-away")) {
            if(left["open"] == true)
            {
                left["open"] = false;
                left["dom"].animate({
                    left: "-18.2vw"
                },400);
            }
            else
            {
                left["open"] = true;
                left["dom"].animate({
                    left: "0vw"
                },400);
            }
        }
        
    });

    right["dom"].click(function(event){
        if ($(event.target).is("#right-put-away")) {
            if(right["open"] == true)
            {
                right["open"] = false;
                right["dom"].animate({
                    right: "-22.5vw"
                },400);
            }
            else
            {
                right["open"] = true;
                right["dom"].animate({
                    right: "0vw"
                },400);
            }
        }

        
    });

    down["dom"].click(function(event){
        if ($(event.target).is("#down-put-away")) {
            if(down["open"] == true)
            {
                down["open"] = false;
                down["dom"].animate({
                    bottom: "-=22.5vh"
                },400);

                right["dom"].animate({
                    height: "+=22.5vh"
                },400);
                left["dom"].animate({
                    height: "+=22.5vh"
                },400);
                
                qus["dom"].animate({
                    bottom: "-=22.5vh"
                },400);
            }
            else
            {
                down["open"] = true;
                down["dom"].animate({
                    bottom: "+=22.5vh"
                },400);

                right["dom"].animate({
                    height: "-=22.5vh"
                },400);
                left["dom"].animate({
                    height: "-=22.5vh"
                },400);

                qus["dom"].animate({
                    bottom: "+=22.5vh"
                },400);
            }
        }
        
    });
});