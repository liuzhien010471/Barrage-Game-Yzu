$(document).ready(function(){
    //左邊題庫
    let qusBank = $(".qus-bank");

    //右邊題目
    const qustionInBank = $(".qustion-in-bank");
    const qustBankParent = $(".qustionbank-parent");
    const qusNumText = $(".qusion-number");


    let nowQusBankId = 1;//目前選擇的題庫id




    //調用此函數創建題目dom
    function createQustionDom(qusIndex = 0,qusContent = {
                                            qustion:"預設題目",
                                            option1:"選項A",
                                            option2:"選項B",
                                            option3:"選項C",
                                            option4:"選項D",
                                            correct:1,
                                            //此題庫內第幾個題目
                                            qusIndex:3,
                                            createDate:"2023-09-13",
                                        }){

        qusContent["qusIndex"]=qusIndex;

        let qusDom =`
        <!-- 一個問題 -->
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading${qusContent["qusIndex"]}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${qusContent["qusIndex"]}" aria-expanded="true" aria-controls="collapse${qusContent["qusIndex"]}">
              <div class="edit-qus" edit-mode="false" qusbank-id="${qusContent["qusIndex"]}" style="margin-right: 10px;">
                <img class="edit-true" src="./assets/icon/edit_FILL0_wght400_GRAD0_opsz48.svg" alt="" width="30px" >
              </div>  
              <div class="create-date">
                ${qusContent["createDate"]}
              </div>
              <div class="qus-name">
                ${qusContent["qustion"]}${qusContent["qusIndex"]+1}
              </div>
              <input type="text" class="edit-qus-name-input" placeholder="預設名稱" style="display: none;">
              <input type="submit" class="edit-qus-name-submit" value="更改題目" style="display: none;">
            </button>
            </h2>
            <div id="collapse${qusContent["qusIndex"]}" class="accordion-collapse collapse" aria-labelledby="heading${qusContent["qusIndex"]}" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div class="row">
                <div class="qus-btn col">${qusContent["option1"]}</div>
                <div class="qus-btn col">${qusContent["option2"]}</div>
                <div class="qus-btn col">${qusContent["option3"]}</div>
                <div class="qus-btn col">${qusContent["option4"]}</div>
                </div>
            </div>
            </div>
        </div>
        `;

        let qusDomUseJquery = $(qusDom); 
        //加入正解變色
        qusDomUseJquery.find(".qus-btn").each(function(i){

            if(i == (qusContent["correct"]-1)){
                $(this).addClass("qus-btn-correct");
                this.classList.add("qus-btn-correct");
            }
        });

        qustionInBank.append(qusDomUseJquery.get());

        //修改題目數量
        let qusNum = parseInt(qusNumText.attr("qus-num"))+1;
        qusNumText.attr("qus-num",qusNum.toString());
        qusNumText.text("題目數量："+ qusNum);
        // 重新設定監聽
        editQusBtn = $(".edit-qus");
        editQusBtn.click(editQusBtnClick);

        return qusDomUseJquery.get();
    }
    
    //調用此函數創建題庫dom
    function CreateQusBankDom(qusBankId,qusBankObj = {
                                            id:0,
                                            name:"預設題庫名稱",
                                            //題庫內題目數量
                                            qusNum:0
                                        }){
        qusBankObj["id"]=qusBankId;

        let qusBankDom = `
        <!-- 題庫 -->
        <div class="col row align-items-center qus-bank" qusbank-id="${qusBankObj["id"]}">
            <div class="col-7 line-clamp-1 qustionbank-text">${qusBankObj["name"]}${qusBankObj["id"]}</div>
            <div class="col-2 line-clamp-1 qustionbank-number">${qusBankObj["qusNum"]}題</div>
            <div class="col-3 rank d-flex justify-content-around align-items-center">
                <div class="edit-qusbank" edit-mode="false" qusbank-id="${qusBankObj["id"]}">
                <img class="edit-true" src="./assets/icon/edit_FILL0_wght400_GRAD0_opsz48.svg" alt="" width="40px">
                </div>
            </div>
        </div>
        <hr style="margin: 0;">
        `;

        
        qustBankParent.append(qusBankDom);

        //重新設定監聽
        qusBank = $(".qus-bank");
        qusBank.click(qusBankClick);
        let editQusBankBtn = $(".edit-qusbank");
        editQusBankBtn.click(editQusBankBtnClick);

        return qusBankDom;
    }

    //----------------以下為開關介面--------------------

    //控制選項
    let editQusBtn = $(".edit-qus");
    let createQusBtn = $(".create-qus");
    let qusBtn = $(".qus-btn");
    let editQusBankBtn = $(".edit-qusbank");
    let createQusBankBtn = $(".create-qusbank");
    let makeQusBtn = $("#make-qus-btn");
    let makeQusbankBtn = $("#make-qusbank-btn");
    //創建題目
    const makeQusCon = $(".make-quetion-con");
    const makeQusBack = $("#make-qus-back");
    const makeQusBg = $("#make-qus-bg");
    //創建題庫
    const makeQusBankCon = $(".make-quetionbank-con");
    const makeQusBankBack = $("#make-qusbank-back");


    //選擇題庫
    qusBank.click(qusBankClick);

    function qusBankClick(){
        //選擇同一個題庫不會重新載入
        if(nowQusBankId != $(this).attr("qusbank-id")){
            nowQusBankId = $(this).attr("qusbank-id");
        
            qusBank.each(function(){
                qusBank.removeClass("qusbank-choose");
            });
            $(this).addClass("qusbank-choose");
    
            //讀取題庫ID
            nowQusBankId = parseInt($(this).attr("qusbank-id"));
    
            //重置題目
            qustionInBank.empty();
            qusIndex = 0;
        }
    }

    //開啟創建題目
    createQusBtn.click(function(){
        makeQusCon.show();
        makeQusBg.show();
    });

    //編輯題目
    editQusBtn.click(editQusBtnClick);

    function editQusBtnClick(){
        //取得題庫id
        let qusBankId = $(this).attr("qusbank-id");
        //取得題目id
        let qusId = $(this).attr("qus-index");
        console.log(qusBankId + "   " + qusId)
        makeQusCon.attr("mode","create");
        makeQusBtn.val("編輯題目");
        makeQusCon.attr("mode","edit");
        makeQusCon.show();
        makeQusBg.show();
    }

    //編輯題庫視窗
    editQusBankBtn.click(editQusBankBtnClick);

    function editQusBankBtnClick(){
        //取得題庫id
        let qusBankId = $(this).attr("qusbank-id");
        makeQusBankCon.show();
        makeQusBg.show();
        makeQusBankCon.attr("mode","edit");
        makeQusBankCon.attr("editQusBankId",qusBankId);
        makeQusbankBtn.val("編輯題庫");
    }


    //關閉創建題目
    makeQusBack.click(function(event){
        if(makeQusCon.attr("mode") == "create"){
            event.preventDefault();
            makeQusCon.hide();
            makeQusBg.hide();
        }
        //如果是編輯題目，關閉時重置回創建
        else if(makeQusCon.attr("mode") == "edit"){
            makeQusCon.attr("mode","create");
            makeQusBtn.val("創建題目");
            event.preventDefault();
            makeQusCon.hide();
            makeQusBg.hide();
        }
    });

    //開啟創建題庫
    createQusBankBtn.click(function(){
        makeQusBankCon.show();
        makeQusBg.show();
    });

    //關閉創建題庫
    makeQusBankBack.click(function(event){
        if(makeQusBankCon.attr("mode") == "create"){
            event.preventDefault();
            makeQusBankCon.hide();
            makeQusBg.hide();
        }
        //如果是編輯題庫，關閉時重置回創建
        else if(makeQusBankCon.attr("mode") == "edit"){
            makeQusBankCon.attr("mode","create");
            makeQusBankCon.attr("editQusBankId","0");
            makeQusbankBtn.val("創建題庫");
            event.preventDefault();
            makeQusBankCon.hide();
            makeQusBg.hide();
        }
        
    });

    //---------以下避免表單送出時跳轉------------------
    
    makeQusbankBtn.click(function(event){
        // action為空白，並在這裡把表單傳入後端
    });

    makeQusBtn.click(function(event){
        // action為空白，並在這裡這裡把表單傳入後端
    });


    //-------------以下為自動創建--------------------

    //自動創建題目dom
    var qusIndex = 1;
    setInterval(function(){
        createQustionDom(qusIndex);
        qusIndex++;
    }, 3000);

    //自動創建題庫dom
    var qusBankIndex = 0;
    setInterval(function(){
        CreateQusBankDom(qusBankIndex);
        qusBankIndex++;
    }, 3000);
});