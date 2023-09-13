$(document).ready(function(){
    //左邊題庫
    let qusBank = $(".qus-bank");

    //右邊題目
    const qustionInBank = $(".qustion-in-bank");
    const qustBankParent = $(".qustionbank-parent");
    const qusNumText = $(".qusion-number");


    var nowQusBankId =0;//目前選擇的題庫id

    //選擇題庫
    qusBank.click(function(){
        qusBank.each(function(){
            qusBank.removeClass("qusbank-choose");
        });
        $(this).addClass("qusbank-choose");

        //讀取題庫ID
        nowQusBankId = parseInt($(this).attr("qusbank-id"));

        //重置題目
        qustionInBank.empty();
        qusIndex = 0;
    });


    //自動創建題目dom
    var qusIndex = 1;
    // setInterval(function(){
    //     qustionInBank.append(createQustionDom(qusIndex));

    //     let qusNum = parseInt(qusNumText.attr("qus-num"))+1;
    //     qusNumText.attr("qus-num",qusNum.toString());
    //     qusNumText.text("題目數量："+ qusNum);
    //     editQus();

    //     qusBtn = $(".qus-btn");
    //     qusBtn.click(qusBtnClick);

    //     qusIndex++;
    // }, 3000);

    //自動創建題庫dom
    var qusBankIndex = 0;
    // setInterval(function(){
    //     qustBankParent.append(CreateQusBankDom(qusBankIndex));


    //     //重新設定監聽
    //     qusBank = $(".qus-bank");
    //     qusBank.click(function(){
    //         qusBank.each(function(){
    //             qusBank.removeClass("qusbank-choose");
    //         });
    //         $(this).addClass("qusbank-choose");

    //         //讀取題庫ID
    //         nowQusBankId = parseInt($(this).attr("qusbank-id"));

    //         //重置題目
    //         qustionInBank.empty();
    //         qusIndex = 0;
    //     });

    //     qusBankIndex++;
    // }, 3000);


    //調用此函數創建題目dom
    function createQustionDom(qusIndex = 0){
        let qusContent = {
            qustion:"預設題目",
            option1:"選項A",
            option2:"選項B",
            option3:"選項C",
            option4:"選項D",
            correct:1,
            //此題庫內第幾個題目
            qusIndex:3,
            createDate:"2023-09-13"
        }

        qusContent["qusIndex"]=qusIndex

        let qusDom =`
        <!-- 一個問題 -->
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading${qusContent["qusIndex"]}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${qusContent["qusIndex"]}" aria-expanded="true" aria-controls="collapse${qusContent["qusIndex"]}">
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

        //加入正解變色
        $(qusDom).find(".qus-btn").each(function(i){
            if(i == (qusContent["correct"]-1)){
                $(this).addClass("qus-btn-correct");
                // console.log($(this).get())
            }
        });

        return qusDom;
    }
    
    //創建題庫dom
    function CreateQusBankDom(qusBankId){
        let qusBankObj = {
            id:0,
            name:"預設題庫名稱",
            qusNum:0 //題庫內題目數量
        };
        qusBankObj["id"]=qusBankId;

        let qusBankDom = `
        <!-- 題庫 -->
        <div class="col row align-items-center qus-bank" qusbank-id="${qusBankObj["id"]}">
            <div class="col-9 line-clamp-1 qustionbank-text">${qusBankObj["name"]}${qusBankObj["id"]}</div>
            <div class="col-3 rank">編輯</div>
        </div>
        <hr style="margin: 0;">
        `;

        // console.log(qusBankDom)

        return qusBankDom;
    }


    //控制選項
    let editQusBtn = $(".edit-qus");
    let createQusBtn = $(".create-qus");
    let editQusName = $(".edit-qus-name-input");
    let editQusNameSub = $(".edit-qus-name-submit");
    let nowEditMode = false;
    // let qusBtnCon = $(".qus-btn-con");
    let qusBtn = $(".qus-btn");

    //編輯題目
    editQusBtn.click(function(){
        let editMode = editQusBtn.attr("edit-mode");
        nowEditMode = Boolean(editMode);
        // console.log(editMode)

        if(editMode == "false"){
            editQusBtn.attr("edit-mode","true");
            editQusBtn.children(".edit-true").hide();
            editQusBtn.children(".edit-false").show();
            editQusName.show();
            editQusNameSub.show();
            nowEditMode = true;
        }else{
            editQusBtn.attr("edit-mode","false");
            editQusBtn.children(".edit-true").show();
            editQusBtn.children(".edit-false").hide();
            editQusName.hide();
            editQusNameSub.hide();
            nowEditMode = false;
        }
    });

    editQus();

    
    //編輯題目
    function editQus(){
        editQusName = $(".edit-qus-name-input");
        editQusNameSub = $(".edit-qus-name-submit");
        //更改題目名稱
        editQusNameSub.click(function(){
            let newName = $(this).siblings(".edit-qus-name-input").val();
            $(this).siblings(".qus-name").text(newName);
        });
    }

    //按下題目中的按鈕
    qusBtn.click(qusBtnClick);

    function qusBtnClick(){
        if(nowEditMode == false){
            return 0;
        }

        let qusBtnCon = $(this).parent();
        let qusIndex = qusBtnCon.attr("qus-index");
        let thisQusOpations = qusBtnCon.children(".qus-btn");
        let qusNo = $(this).attr("qus-no");
        

        thisQusOpations.each(function(i){
            if($(this).hasClass("qus-btn-correct")){
                if($(this).attr("qus-no") != qusNo){
                    $(this).removeClass("qus-btn-correct");
                }
            }
        });
        $(this).addClass("qus-btn-correct");
        
    }
    


    //創建題目
    const makeQusCon = $(".make-quetion-con");
    const makeQusBack = $("#make-qus-back");
    const makeQusBg = $("#make-qus-bg");

    createQusBtn.click(function(){
        makeQusCon.show();
        makeQusBg.show();
    });

    makeQusBack.click(function(){
        makeQusCon.hide();
        makeQusBg.hide();
    });

});