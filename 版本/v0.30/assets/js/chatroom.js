$(document).ready(function(){
    const messageSendBtn = $("#send-message");
    const messageInput = $("#message-input");
    const chatroomCon = $("#chatroom-con");

    var messageObj = {
        id:0,
        username:"預設姓名",
        permissions:"student",
        time:"00:00",
        message:"",
        color:"white",
        type:0
    };

    const barrageContainer = $("#barrageContainer");
    const right = $(".right");

    // 自動發送測試訊息
    setInterval(AutoSendMessage, 3000);

    // 每隔2秒創建一條彈幕
    // var inputText = '這是一條彈幕訊息！';
    // setInterval(function() {
    //     createBarrage(inputText);
    // }, 2000);

    //enter執行送出
    $("#message-input").keyup(function(event) {
        if (event.which === 13) {
            messageSendBtn.click();//觸發發送訊息
        }
    });


    // ---------以下function-------------

    
    messageSendBtn.click(function(){
        messageObj["message"] = messageInput.val();
        if(messageObj["message"]!=""){
            messageObj["time"] = getCurrentTime();
            $msg = CreatSelfMessage();

            chatroomCon.append($msg);
            chatroomCon.scrollTop(chatroomCon[0].scrollHeight);

            if(toggleBarrageOpen==true){
                createBarrage(messageObj["message"],messageObj["color"],messageObj["type"]);
            }

            messageInput.val("");
        }
    });


    //其他用戶的訊息
    function CreatMessage(){
        var $msg = `
        <!-- 其他人的對話 -->
        <div class="col row" id="message-con">
            <div class="col-3 message-username">${messageObj["username"]}</div>
            <div class="col-9 message-time">${messageObj["time"]}</div>
            <div class="col-12 message">${messageObj["message"]}</div>
        </div>
        <hr>`;

        return $msg;
    }
    
    //發送訊息
    function CreatSelfMessage(){
        var $msg = `
        <!-- 自己的對話 -->
        <div class="col row message-username-self-con" id="message-con">
            <div class="col-3 message-username-self">${messageObj["username"]}</div>
            <div class="col-9 message-time">${messageObj["time"]}</div>
            <div class="col-12 message">${messageObj["message"]}</div>
        </div>
        <hr>`;
        CreatJsonMessage();

        return $msg;
    }

    // 取得時間
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        return timeString;
    }

    // 自動發送測試訊息
    function AutoSendMessage(){
        messageObj["message"] = "自動訊息";
        messageObj["time"] = getCurrentTime();
        $msg = CreatMessage();
        chatroomCon.append($msg);
        chatroomCon.scrollTop(chatroomCon[0].scrollHeight);

        createBarrage(messageObj["message"],"white",messageObj["type"]);
    }

    // 製作成JSON格式
    function CreatJsonMessage(){
        // 轉為json
        var messagJson = JSON.stringify(messageObj);

        //json轉obj
        messageObj = JSON.parse(messagJson);
        // console.log(messageObj);
    }



    //-------------------彈幕---------------------
  
    //建立彈幕
    function createBarrage(text,color="black",type=0) {
      // 創建彈幕元素
      const barrageElement = $('<div class="barrage"></div>').text(text);
      barrageContainer.append(barrageElement);
  
      // 隨機設置彈幕的垂直位置
      const minTop = 0;
      const maxTop = barrageContainer.height() - barrageElement.outerHeight();
      const randomTop = Math.floor(Math.random() * (maxTop - minTop + 1) + minTop);
      barrageElement.css("top", randomTop);
      barrageElement.css("color", color);
  
      // 將彈幕元素的 left 位置設置為 barrageContainer 的寬度，使彈幕元素一開始位於容器的右邊界之外
      barrageElement.css("left", barrageContainer.width()-right.width());
      
      // 將彈幕從右側滾動到畫面左側
      barrageElement.animate({ left: -barrageElement.outerWidth() }, {
        duration: 7000,
        easing: "linear",
        complete: function() {
          barrageElement.remove();
        }
      });
    }

    //--------------------------選色-------------------
    const colorBtn = $(".color-btn");

    colorBtn.click(function(){
        var clickItem = $(this);

        colorBtn.each(function(index, element){
            $(element).css("filter","brightness(1)");
        });

        clickItem.css("filter","brightness(0.8)");
        messageObj["color"] = clickItem.attr("color");
    });

    //---------------------開關彈幕-----------------
    const toggleBarrage = $("#toggle-Barrage");
    var toggleBarrageOpen = true;//預設開啟
    // console.log(toggleBarrage);
  
    toggleBarrage.click(function(){
        if(toggleBarrage.attr("now")=="open"){
            toggleBarrage.attr("now","close");
            toggleBarrage.text("開啟彈幕");
            toggleBarrageOpen = false;
            $(".barrage").remove();
        }
        else if(toggleBarrage.attr("now")=="close"){
            toggleBarrage.attr("now","open");
            toggleBarrage.text("關閉彈幕");
            toggleBarrageOpen = true;
        }
    })






    
});