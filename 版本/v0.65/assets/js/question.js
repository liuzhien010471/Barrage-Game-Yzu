$(document).ready(function(){
        // 您的題目內容
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
  
      // 解析題目內容
      var questions = parseFileContent(fileContent);
      // console.log(questions);
  
      // 解析文本檔內容，將每個題目解析為對象並存入二維陣列中
      function parseFileContent(content) {
        var questionBlocks = content.trim().split(';');
        var questionArray = [];
  
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
      var outputDiv = document.getElementById("nowQus-con");
      questions.forEach(function (question, index) {

        let result = "未完成";//三種狀態，未完成、完成、進行中

        var questionDiv = document.createElement("div");

        questionDiv.className = "qus-text-con row";
        $(questionDiv).css("height","auto");

        questionDiv.innerHTML = `
            <!-- 自己 -->
            <div class="col row member-username-con" id="member-con">
                <div class="qus-text col-9">${index + 1}.${question.qus}</div>
                <div class="qus-text-state col-3">${result}</div>
            </div>
            <hr>
        `;
        
        outputDiv.appendChild(questionDiv);
      });

      //--------出題-------------
      const qus = $(".qus");
      const options = $(".options");

      Question();

      //隨機選取題目並顯示在畫面上
      function Question(){
        var randomIndex = parseInt(Math.floor(Math.random() * questions.length));
        qus.text(questions[randomIndex]["qus"]);
        qus.attr("no",randomIndex+1);

        for(let i=0;i<4;i++){
            let index = "option" + (i+1).toString();
            $(options[i]).text(questions[randomIndex][index]);
        }
      }

      options.click(function(event){
        var no = $(this).attr("no");//第幾個選項
        console.log(no);
        console.log(questions[parseInt(qus.attr("no"))-1]["answer"]);
        if(no == questions[parseInt(qus.attr("no"))-1]["answer"]){
            console.log("答對了");
        }
        else{
            console.log("答錯了");
        }
      });


      //------------老師出題-----------------------------

      let qusBank = $(".qus-bank");
      const qusBankParent = $(".qustionbank-parent");
      const makeQusCon = $(".make-quetion-con");
      const qusSubBtn = $("#make-qus-btn-t");

      const qustionInBank = $(".qus-inleft-parent");
      const qustBankParent = $(".qustionbank-parent");
      const qusNumText = $(".qusion-number");
  

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

      // let qusDom =`
      // <!-- 一個問題 -->
      // <div class="accordion-item">
      //     <h2 class="accordion-header" id="heading${qusContent["qusIndex"]}">
      //     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${qusContent["qusIndex"]}" aria-expanded="true" aria-controls="collapse${qusContent["qusIndex"]}">
      //       <div class="create-date">
      //         ${qusContent["createDate"]}
      //       </div>
      //       <div class="qus-name">
      //         ${qusContent["qustion"]}${qusContent["qusIndex"]+1}
      //       </div>
      //       <input type="text" class="edit-qus-name-input" placeholder="預設名稱" style="display: none;">
      //       <input type="submit" class="edit-qus-name-submit" value="更改題目" style="display: none;">
      //     </button>
      //     </h2>
      //     <div id="collapse${qusContent["qusIndex"]}" class="accordion-collapse collapse" aria-labelledby="heading${qusContent["qusIndex"]}" data-bs-parent="#accordionExample">
      //     <div class="accordion-body">
      //         <div class="row">
      //         <div class="qus-btn col">${qusContent["option1"]}</div>
      //         <div class="qus-btn col">${qusContent["option2"]}</div>
      //         <div class="qus-btn col">${qusContent["option3"]}</div>
      //         <div class="qus-btn col">${qusContent["option4"]}</div>
      //         </div>
      //     </div>
      //     </div>
      // </div>
      // `;

      let qusDom =`
      <!-- 題目 -->
      <div class="col align-items-center qus-left-con" qus-id="1">
          <div class="col-12 line-clamp-1 qus-name">${qusContent["qustion"]}${qusContent["qusIndex"]+1}</div>
      </div>
      <hr style="margin: 0;">
      `;

      //加入正解變色
      $(qusDom).find(".qus-btn").each(function(i){
          if(i == (qusContent["correct"]-1)){
              $(this).addClass("qus-btn-correct");
              // console.log($(this).get())
          }
      });

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
      let chooseNumber = nowChooseQus.length;

      CreatNowQusDom();

      nowQusCon.append(newQusDom);

      //移除選取
      nowChooseQus.removeClass("qus-left-con-choose");
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
          <div class="col row member-username-con" id="member-con">
              <div class="qus-text col-9">${question["index"]+1}.${question["name"]}</div>
              <div class="qus-text-state col-3">${question["reslut"]}</div>
          </div>
          <hr>
        </div>
      `;
    }


    




});