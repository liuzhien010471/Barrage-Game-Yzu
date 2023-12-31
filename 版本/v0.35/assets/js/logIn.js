$(document).ready(function(){
    var studentDiv = $(".student-login");
    var teacherDiv = $(".teacher-login");
    var bg = $(".bg");
    var nowChoose = 0;//0無選擇1學生2教師

    studentDiv.click(function(){
        if(nowChoose != 1){
            nowChoose=1;

            teacherDiv.find(".content > .information > .introduce").fadeOut(100);
            teacherDiv.find(".content > .information > .avater").fadeOut(50,function(){
                setTimeout(function(){
                    teacherDiv.find(".content > .information > .avater").fadeIn(300);
                },100);
            });
    
            teacherDiv.find(".content").css("padding","30px");
            studentDiv.find(".content > .information > .introduce").fadeIn();
            // studentDiv.find(".content > .information > .avater").fadeOut(50,function(){
            //     setTimeout(function(){
            //         studentDiv.find(".content > .information > .avater").fadeIn(300);
            //     },100);
            // });
    
            teacherDiv.find(".content > .log-in-form").fadeOut(150);
            studentDiv.find(".content > .log-in-form").fadeIn();
    
            studentDiv.addClass("zoom-in");
            studentDiv.removeClass("zoom-out");
    
            teacherDiv.addClass("zoom-out");
            teacherDiv.removeClass("zoom-in");
        }
    });

    teacherDiv.click(function(){
        if(nowChoose != 2){
            nowChoose = 2;
            studentDiv.find(".content > .information > .introduce").fadeOut(100);
            studentDiv.find(".content > .information > .avater").fadeOut(50,function(){
                setTimeout(function(){
                    studentDiv.find(".content > .information > .avater").fadeIn(300);
                },100);
            });
    
            studentDiv.find(".content").css("padding","30px");
            teacherDiv.find(".content > .information > .introduce").fadeIn();
            // teacherDiv.find(".content > .information > .avater").fadeOut(50,function(){
            //     setTimeout(function(){
            //         teacherDiv.find(".content > .information > .avater").fadeIn(300);
            //     },100);
            // });
    
            teacherDiv.find(".content > .log-in-form").fadeIn();
            studentDiv.find(".content > .log-in-form").fadeOut(150);
    
            studentDiv.addClass("zoom-out");
            studentDiv.removeClass("zoom-in");
            
            teacherDiv.addClass("zoom-in");
            teacherDiv.removeClass("zoom-out");
        }
    });

    bg.click(function(){
        if(nowChoose != 0){
            nowChoose = 0;

            teacherDiv.find(".content > .information > .introduce").fadeIn();
            studentDiv.find(".content > .information > .introduce").fadeIn();
            teacherDiv.find(".content").css("padding","70px 50px");
            studentDiv.find(".content").css("padding","70px 50px");
    
            teacherDiv.find(".content > .log-in-form").fadeOut(100);
            studentDiv.find(".content > .log-in-form").fadeOut(100);
    
            studentDiv.removeClass("zoom-in");
            studentDiv.removeClass("zoom-out");
    
            teacherDiv.removeClass("zoom-out");
            teacherDiv.removeClass("zoom-in");
        }
    });

});