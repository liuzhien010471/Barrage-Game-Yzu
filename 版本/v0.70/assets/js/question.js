$(document).ready(function(){
    var fileContent = `
    no:1
    qus:a,
    option1:b,
    option2:c,
    option3:d,
    option4:e,
    answer:1
    ;
    no:2
    qus:a2,
    option1:b2,
    option2:c2,
    option3:d2,
    option4:e2,
    answer:2
    ;
    no:3
    qus:a3,
    option1:b3,
    option2:c3,
    option3:d3,
    option4:e3,
    answer:3
    ;
    `;

    // fileContent="";

    // 解析題目內容
    var questions = parseFileContent(fileContent);
    // console.log(questions);

    // 解析文本檔內容，將每個題目解析為對象並存入二維陣列中
    function parseFileContent(content) {
      
      var questionBlocks = content.trim().split(';');
      var questionArray = [];

      // if(content == ""){return questionArray;}

      questionBlocks.forEach(function (block) {
          var lines = block.trim().split('\n');
          var question = {};

          lines.forEach(function (line) {
              var parts = line.split(':');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim().replace(",", ""); // 去除值中的逗號
                  question[key] = value;
              }
          });

          if (Object.keys(question).length > 0) {
              questionArray.push(question);
          }
      });

      return questionArray;
    }

    // 顯示解析後的結果
    var qustionQueue = $("#nowQus-con");
    // questions.forEach(function (question, index) {

    //   let result = "未完成";//三種狀態，未完成、完成、進行中

    //   var questionDiv = $("<div/>", {
    //       "class": "qus-text-con row",
    //       "css": {
    //           "height": "auto"
    //       },
    //       "html": `
    //           <!-- 自己 -->
    //           <div class="col row member-username-con member-con">
    //               <div class="qus-text col-9">${index + 1}.${question.qus}</div>
    //               <div class="qus-text-state col-3">${result}</div>
    //           </div>
    //           <hr>
    //       `
    //   });

    //   qustionQueue.append(questionDiv);
    // });

    //--------出題-------------
    const qus = $(".qus");
    const options = $(".options");

    Question();

    //隨機選取題目並顯示在畫面上
    function Question(){
      var randomIndex = parseInt(Math.floor(Math.random() * questions.length));
      qus.find(".answer-title").text(questions[randomIndex]["qus"]);
      qus.attr("no",randomIndex+1);

      for(let i=0;i<4;i++){
          let index = "option" + (i+1).toString();
          $(options[i]).text(questions[randomIndex][index]);
      }
    }

    // options.click(function(event){
    //   var no = $(this).attr("no");//第幾個選項
    //   // console.log(no);
    //   // console.log(questions[parseInt(qus.attr("no"))-1]["answer"]);
    //   if(no == questions[parseInt(qus.attr("no"))-1]["answer"]){
    //       console.log("答對了");
    //   }
    //   else{
    //       console.log("答錯了");
    //   }
    // });


    //------------老師出題-----------------------------

    let qusBank = $(".qus-bank");
    const qusBankParent = $(".qustionbank-parent");
    const makeQusCon = $(".make-quetion-con");
    const qusSubBtn = $("#make-qus-btn-t");

    const qustionInBank = $(".qus-inleft-parent");
    const qustBankParent = $(".qustionbank-parent");
    const qusNumText = $(".qusion-number");

    // makeQusCon.show();

    //對父母設置事件委託
    qusBankParent.on("click",".qus-bank",QusBankClick)

    //選擇題庫
    function QusBankClick(){
      if($(this).hasClass("qusbank-choose")){
        return;
      }
      else{
        qusBank.each(function(){
          qusBank.removeClass("qusbank-choose");
        });
        $(this).addClass("qusbank-choose");

        //讀取題庫ID
        nowQusBankId = parseInt($(this).attr("qusbank-id"));

        //重置題目
        qustionInBank.empty();
        // console.log(this)
        qusIndex = 0;
      }
    }


    //測試makeQus()用
    qusSubBtn.click(function(){
      var qus = makeQus();
      console.log(qus);
    });

    //抓取輸入的題目資料
    function makeQus(){
      var qus = {
        qustion:$("#question-textarea").val(),
        options1: $(".qus-opation-name").eq(0).val(),
        options2: $(".qus-opation-name").eq(1).val(),
        options3: $(".qus-opation-name").eq(2).val(),
        options4: $(".qus-opation-name").eq(3).val(),
        correct:$(".qus-opation:checked").val()
      }

      return qus;
    }

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
                                              createDate:"2023-09-13"
                                          }){


      qusContent["qusIndex"]=qusIndex

      let qusDom =`
      <!-- 題目 -->
      <div class="col align-items-center qus-left-con" qus-id="${qusContent["qusIndex"]+1}">
          <div class="col-12 line-clamp-1 qus-name">${qusContent["qustion"]}${qusContent["qusIndex"]+1}</div>
      </div>
      <hr style="margin: 0;">
      `;

      qustionInBank.append(qusDom);

      let qusNum = parseInt(qusNumText.attr("qus-num"))+1;
      qusNumText.attr("qus-num",qusNum.toString());
      qusNumText.text("題目數量："+ qusNum);

      qusBtn = $(".qus-btn");

      return qusDom;
    }


      //創建題庫dom
      function CreateQusBankDom(qusBankId,qusBankObj = {
                                              id:0,
                                              name:"預設題庫名稱",
                                              qusNum:0 //題庫內題目數量
                                          }){
        qusBankObj["id"]=qusBankId;

        let qusBankDom = `
        <!-- 題庫 -->
        <div class="col row align-items-center qus-bank" qusbank-id="${qusBankObj["id"]}">
            <div class="col-12 line-clamp-1 qus-bank-name">${qusBankObj["name"]}${qusBankObj["id"]}</div>
        </div>
        <hr style="margin: 0;">
        `;

        qustBankParent.append(qusBankDom);
        // console.log(qusBankDom)

        //重新設定監聽
        qusBank = $(".qus-bank");


        return qusBankDom;
      }

      //自動創建題庫dom
      var qusBankIndex = 0;
      setInterval(function(){
          CreateQusBankDom(qusBankIndex)

          qusBankIndex++;
      }, 3000);

    //自動創建題目dom
    var qusIndex = 1;
    setInterval(function(){
        createQustionDom(qusIndex);


        qusIndex++;
    }, 3000);

    //----------------老師選擇題目並出題--------------

    let qusLeftCon = $(".qus-left-con");
    const qusInLeftParent = $(".qus-inleft-parent");
    const submitNewQusToGameBtn = $("#submit-new-qus-to-game");
    // 顯示出題的結果
    let nowQusCon = $("#nowQus-con");
    // 題目佇列
    // var qustionQueue = $("#nowQus-con");


    //選取問題
    function qusLeftConClick(){
      if($(this).hasClass("qus-left-con-choose")){
        $(this).removeClass("qus-left-con-choose");
      }else{
        $(this).addClass("qus-left-con-choose");
      }
    }
    qusInLeftParent.on("click",".qus-left-con",qusLeftConClick);


    //送出已選取的問題
    submitNewQusToGameBtn.click(SubmitNewQusToGameBtnClick);
    function SubmitNewQusToGameBtnClick(event){
      //現在選取
      let nowChooseQus = $(".qus-left-con-choose");
      let chooseNumber = nowChooseQus.length;//出題數量
      let choosQusBank = $(".qusbank-choose");//出題的題庫id
      
      let nowChooseQusID = new Array(chooseNumber);//紀錄出題所有id
      nowChooseQus.each(function(index){
        nowChooseQusID[index] = $(this).attr("qus-id");
      });

      let nowChooseQusName = new Array(chooseNumber);//紀錄出題所有名稱
      nowChooseQus.each(function(index){
        nowChooseQusName[index] = $(this).text();
      });


      // CreatNowQusDom(nowChooseQus);

      //移除選取
      nowChooseQus.removeClass("qus-left-con-choose");

      //送出此結構給後端
      let chooseQusObj = {
        number:chooseNumber,//出題數量
        qusBank:choosQusBank,//出題的題庫id
        qusIdArray:nowChooseQusID//紀錄出題所有id
      }
      

      chooseQusObj = {
        number:chooseNumber,//出題數量
        qusBank:choosQusBank,//出題的題庫id
        qusIdArray:nowChooseQusID,//紀錄出題所有id
        nowChooseQusName:nowChooseQusName,//出題所有標題
        questionObj: Array.from({ length: 10 }, () => ({
          name: "預設名稱",
          opation1: "選項A",
          opation2: "選項B",
          opation3: "選項C",
          opation4: "選項D",
          correct: 1
        }))
      }

      CreatNowQusDomForEach(chooseQusObj);
      
    }

    //把選取題目放入已出題佇列
    function CreatNowQusDomForEach(chooseQusObj = {
                                      number:0,//出題數量
                                      qusBank:"",//出題的題庫id
                                      qusIdArray:"",//紀錄出題所有id
                                      nowChooseQusName:"",//出題所有標題
                                    }){
      
      for(let i=0;i<chooseQusObj.number;i++){
        let question = {
          name:chooseQusObj.nowChooseQusName[i],
          index:i,
          reslut:"未完成"
        };
        CreatNowQusDom(question);
      }

    }


    //創建目前已出題題目
    function CreatNowQusDom(question = {
                              name:"預設題目",
                              index:0,
                              reslut:"未完成"
                            }){

      let newQusDom = `
        <div class="qus-text-con row" style="height:auto>
          <!-- 自己 -->
          <div class="col row member-username-con member-con" >
              <div class="qus-text col-9">${question["index"]+1}.${question["name"]}</div>
              <div class="qus-text-state col-3">${question["reslut"]}</div>
          </div>
          <hr>
        </div>
      `;

      qustionQueue.append(newQusDom);
      // $(outputDiv).append(newQusDom);

      QueueToQuestion();

      return newQusDom;
    }

    //----------------題目按鈕控制------------------------------------

    //顯示與隱藏題目選擇，有題目才顯示
    function ShowTheQustionToStudent(){
      makeQusCon.show();
    }
    //沒題目時隱藏
    function HideTheQustionToStudent(){
      makeQusCon.hide();
    }


    //改變按鈕顏色顯示選取的題目正確or錯誤
    var qusCon = $(".qus-con");
    var optionCon = $(".options-con");
    function changeQusBtnColor(btnNum = "1", correct = false) {
      let targetBtn = qusCon.find(`button[no="${btnNum}"]`);

      if (correct == true) {
        targetBtn.removeClass("options-checked");
        targetBtn.removeClass("options-incorrect");
        targetBtn.addClass("options-correct");
      } else {
        targetBtn.removeClass("options-checked");
        targetBtn.removeClass("options-correct");
        targetBtn.addClass("options-incorrect");
      }
    }

    // changeQusBtnColor("2", false);
    // changeQusBtnColor("3", true);

    //套用按鈕被選中時的外觀
    optionCon.on("click", ".options", function() {
      optionCon.find(".options-checked").removeClass("options-checked");
      $(this).addClass("options-checked");
    });

    //把按鈕上多餘class清除，用於更換題目時
    function ClearOptionsClass(){
      optionCon.find(".options").each(function() {
        $(this).attr("class", "col btn options");
      });
    }

    // ClearOptionsClass();
    
    //設置答題剩餘時間
    function ChangeQusAnswerTime(inputTime){
      optionCon.find(".answer-time").text(`${inputTime}秒`);
    }
    
    
    //-------------------把佇列放入正在出題------------------------

    
    //把題目放到選項上，傳入題目
    function QueueToQuestion(questionObj= {
                          qusbankid:1,
                          qusid:1,
                          name: "預設題目",
                          opation1: "選項A",
                          opation2: "選項B",
                          opation3: "選項C",
                          opation4: "選項D",
                          correct: 1
                      }){

      qus.text(questionObj["name"]);
      qus.attr("no",questionObj["qusid"]);

      for(let i=0;i<4;i++){
          let index = "option" + (i+1).toString();
          $(options[i]).text(questionObj[index]);
      }
    }

    //判斷答題正確
    options.click(function(event){
      var no = $(this).attr("no");//第幾個選項
      // console.log(no);
      // console.log(questions[parseInt(qus.attr("no"))-1]["answer"]);
      let index = $(this).closest(".qus").attr("no");
      if(no == questions[parseInt(qus.attr("no"))-1]["answer"]){
          console.log("答對了");
          
          changeQueueState(index,"答對了")
      }
      else{
          console.log("答錯了");
          changeQueueState(index,"答錯了")
      }

      
    });

    //改變狀態，傳入要改變的佇列中題目，1為開始
    function changeQueueState(index="0",state="未作答"){
      let queue = $(".member-con");
      console.log(index);
      queue.eq(index).find(".qus-text-state").text(state);
    }


    




});