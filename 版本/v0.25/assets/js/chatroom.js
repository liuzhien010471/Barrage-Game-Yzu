$(document).ready(function(){
    var messageSendBtn = $("#send-message");
    var messageInput = $("#message-input");
    var chatroomCon = $("#chatroom-con");

    var username="預設姓名";
    var time ="00:00";
    var message="";

    
    messageSendBtn.click(function(){
        message = messageInput.val();
        time = getCurrentTime();
        $msg = CreatSelfMessage();
        chatroomCon.append($msg);
    });


    function CreatMessage(){
        const $msg = `
        <!-- 其他人的對話 -->
        <div class="col row" id="message-con">
            <div class="col-3 message-username">${username}</div>
            <div class="col-9 message-time">${time}</div>
            <div class="col-12 message">${message}</div>
        </div>
        <hr>`;

        return $msg;
    }
    
    function CreatSelfMessage(){
        const $msg = `
        <!-- 自己的對話 -->
        <div class="col row" id="message-con">
            <div class="col-3 message-username-self">${username}</div>
            <div class="col-9 message-time">${time}</div>
            <div class="col-12 message">${message}</div>
        </div>
        <hr>`;

        return $msg;
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        return timeString;
    }

    function AutoSendMessage(){
        message = "自動訊息";
        time = getCurrentTime();
        $msg = CreatMessage();
        chatroomCon.append($msg);
    }

    setInterval(AutoSendMessage, 3000);
});