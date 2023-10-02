$(document).ready(function(){

    //------------------控制顯示介面--------------------
    const createRoom = $("#create-room");
    const createRoom2 = $("#create-room2");
    const openRoomListBtn = $("#open-room-list");

    const createRoomBoard = $("#create-room-con");
    const joineRoomBoard = $(".join-room-con");

    createRoom2.click(function(event){
        event.preventDefault();
        roomHistoryReplay.each(function(){
            $(this).css("background-color", "");
        });
        if(joineRoomBoard.css("display") != "none"){
            joineRoomBoard.fadeOut(200,function(){
                createRoomBoard.fadeIn();
            });
        }
        // if(replayBoard.css("display") != "none"){
        //     replayBoard.fadeOut(200,function(){
        //         createRoomBoard.fadeIn();
        //     });
        // }
    });

    openRoomListBtn.click(OpenRoomList);

    function OpenRoomList(){
        roomHistoryReplay.each(function(){
            $(this).css("background-color", "");
        });
        if(createRoomBoard.css("display") != "none"){
            createRoomBoard.fadeOut(200,function(){
                joineRoomBoard.fadeIn();
            });
        }
        // if(replayBoard.css("display") != "none"){
        //     replayBoard.fadeOut(200,function(){
        //         joineRoomBoard.fadeIn();
        //     });
        // }
        replayCon.slideUp(250);
        playRecordListCon.slideUp(250,function(){
            roomListCon.slideDown();
        });
    }


    
    //--------------------顯示遊玩紀錄--------------------

    // 查詢房間紀錄
    const replayBoard = $(".replay-information");
    
    var roomHistoryReplay = $(".roomHistory");

    //點擊後顯示房間詳細資訊
    roomHistoryReplay.click(function(){
        if(createRoomBoard.css("display") != "none"){
            createRoomBoard.fadeOut(200,function(){
                replayBoard.fadeIn();
            });
        }
        if(joineRoomBoard.css("display") != "none"){
            joineRoomBoard.fadeOut(200,function(){
                replayBoard.fadeIn();
            });
        }

        //提取房間資訊
        var roomHistoryReplayInfor = {
            name: $(this).find(".room-name").text(),
            roomId: $(this).attr("room-id"),
            date: $(this).find(".date").text(),
            type: $(this).find(".room-type").text(),
            qusType: $(this).find(".room-qus-type").text(),
            rand: $(this).find(".rank").text()
        };

        roomHistoryReplay.each(function(){
            $(this).css("background-color", "");
        });
        $(this).css("background-color","rgb(230,230,230)")

        replayBoard.find(".room-name").text(roomHistoryReplayInfor["name"]);
        replayBoard.find(".room-id").text("ID:"+ roomHistoryReplayInfor["roomId"]);
        replayBoard.find(".room-type").text(roomHistoryReplayInfor["type"]);
        replayBoard.find(".room-qus-type").text(roomHistoryReplayInfor["qusType"]);
    });


    //----------------------加入房間---------------------
    const canJoinRoom = $(".canJoinRoom");
    const canJoinRoomCon = $("#can-join-room-con");

    //加入房間
    canJoinRoomCon.on("click",".canJoinRoom",function(){
        joinRoom($(this));
    })

    function joinRoom(obj){
        var roomId = obj.find(".room-id").attr("room-id");
        console.log("你加入了" + roomId + "房間");
    }


    //------------------------新增房間------------------

    const createRoomSub = $("#create-room-submit");
    const backToRoomList = $("#back-to-room-list");

    backToRoomList.click(function(event){
        event.preventDefault();
        OpenRoomList();
    })

    //創建房間
    createRoomSub.click(function(event){
        // event.preventDefault();

        // 此處插入後端資料
        
        CreatRoomDom();//創建dom，需要傳入房間資訊
    });

    function CreatRoomDom(roomInfor = {
                            roomId: 121212,
                            type: "類型",
                            qusType: "出題類型",
                            name: "房間名稱"
                        }){

        //加入html
        var roomHtml = `
        <!-- 可加入的房間 -->
        <div class="col row align-items-center room-board-con canJoinRoom">
            <div class="col-2 room-id" room-id="${roomInfor["roomId"]}">ID:${roomInfor["roomId"]}</div>
            <div class="col-3 room-name line-clamp-1">${roomInfor["name"]}</div>
            <div class="col-2 room-type">${roomInfor["type"]}</div>
            <div class="col-3 room-qus-type">${roomInfor["qusType"]}</div>
            <div class="col-2 room-people">12/30</div>
        </div>
        <hr style="margin: 0;">
        `;

        
        canJoinRoomCon.append(roomHtml);
    }


    //----------------------判斷權限--------------------
    var accountPermissions = "teacher";//帳號權限
    // var accountPermissions = "student";

    if(accountPermissions == "student"){
        createRoom.hide();
        createRoomBoard.hide();
    }


    //-------------顯示歷史/顯示房間列表--------------------
    const playRecordListCon = $("#play-record-lsit-con");
    const replayCon = $("#replay-con");
    const roomListCon = $("#room-list-con");
    const lookHistoryBtn = $("#look-history");

    lookHistoryBtn.click(function(){
        roomListCon.slideUp(250,function(){
            replayCon.slideDown();
            playRecordListCon.slideDown();
        });
        
    });


    //----------------顯示頭貼---------------------
    const profilePhoto = $("#profile-photo");//頭貼

    ChangeProfilePhoto("./assets/img/001.jpg");
    //改變頭像，傳入URL
    function ChangeProfilePhoto(profileUrl=""){
        profilePhoto.attr("src",profileUrl);
    }


    //------------設置權限-----------------
    const permissionTitle = $("#permission-title");
    const manageQusBankBtn = $("#manage-qus-bank-btn");

    // SetUserPermission("學生");
    function SetUserPermission(permission){
        if(permission=="老師"){
            permissionTitle.text("老師");
            manageQusBankBtn.show();
        }
        else if(permission=="學生"){
            permissionTitle.text("學生");
            manageQusBankBtn.hide();
        }
    }
});