'use strict';

let requestURL='https://gimahug.github.io/question/data.json';

//获取json数据
let request=new XMLHttpRequest();
request.open('GET',requestURL);
request.responseType='json';
request.send();


let schedule=document.querySelector('.schedule p');
let sentenceDiv=document.querySelector('.sentence');
let sentence=document.querySelector('.sentence p');
let span1=document.querySelector('.span1');
let span2=document.querySelector('.span2');
let span3=document.querySelector('.span3');
let analysis=document.querySelector('.analysis p');
let option1=document.querySelector('.option1');
let option2=document.querySelector('.option2');
let readAnswer=document.querySelector('.readAnswer');
let next=document.querySelector('.next');
let again=document.querySelector('.again');
let summary=document.querySelector('.summary');



let right=0;
let wrong=0;





           
request.onload=function(){
    let questions=request.response;
    let num=0;
    for(let i=0;i<questions.length;i++){
        questions[i]["is_collect"]=false;
    }
    display(num);


    
    function display(num){
        let question=questions[num];
        let answer=question["answer"];
        
       
        analysis.textContent=question["analysis"];
        
        init(question);

        option1.onclick=function(){
            if(option1.textContent===answer){
                
                isCorrect(option1);
            }else{

               isWrong(option1,option2);
            }

            return;

        }

        option2.onclick=function(){
            if(option2.textContent===answer){
                isCorrect(option2);
            }else{
   
                isWrong(option2,option1);
            }
            return;

        }

        readAnswer.onclick=function(){

            let displayAgain=setTimeout(toAgain,500);
        }




        //初始化几个按钮选项
        function init(jsonObj){
            sentence.style.display="block";
            span1.style.display="none";
            span2.style.display="none";
            span3.style.display="none";
            analysis.style.display="none";
            next.style.display="none";
            option1.style.display="block";
            option2.style.display="block";
            again.style.display="none";
            readAnswer.style.display="block";
            option1.style.backgroundColor="white";
            option2.style.backgroundColor="white";

            schedule.textContent=jsonObj["count"]+"/20";
            sentence.textContent=jsonObj["sentence"];
            let array=jsonObj["options"].split(',');
            option1.textContent=array[0];
            option2.textContent=array[1];
            readAnswer.textContent="看答案";
        }


        function isCorrect(rightAnswer){
            
            if(question["is_collect"]===false){
                right+=1;
                questions["is_collect"]===true;
            }
            
            
            rightAnswer.style.backgroundColor="green";
            //等待0.5s执行next()
            let displayNext=setTimeout(toNext,500);
        }


        function isWrong(wrongAnswer,rightAnswer){
            
            if(question["is_collect"]===false){
                wrong+=1;
                questions["is_collect"]===true;
            }
            
           
            rightAnswer.style.backgroundColor="green";
            wrongAnswer.style.backgroundColor="pink";
    
            let displayAgain=setTimeout(toAgain,500);
        }


        function toNext(){
            num+=1;
            option1.style.display="none";
            option2.style.display="none";
            readAnswer.style.display="none";

            let arr=sentence.textContent.split('__');

            sentence.style.display="none";
            span1.textContent=arr[0]+" ";
            span2.textContent=" "+answer;
            span3.textContent=" "+arr[1];

            span1.style.display="inline";
            span3.style.display="inline";
            span2.style.display="inline-block";
            span2.style.textDecoration="underline";
            span2.style.color="green";
    
            if(num===questions.length){
                summary.style.display="block";
                summary.textContent="Right:"+right+" Wrong:"+wrong;
                
            }else{
                next.style.display="block";
                //下一题
                next.onclick=function(){
                    
                    display(num);
                }
            }
        }




        function toAgain(){
            sentence.style.display="none";
            analysis.style.display="block";
            option1.style.display="none";
            option2.style.display="none";
            readAnswer.style.display="none";
            again.style.display="block";

            let arr=sentence.textContent.split('__');


            span1.textContent=arr[0]+" ";
            span2.textContent=" "+answer;
            span3.textContent=" "+arr[1];

            span1.style.display="inline";
            span3.style.display="inline";
            span2.style.display="inline-block";
            span2.style.textDecoration="underline";
            span2.style.color="pink";

       


    
            again.onclick=function(){
                display(num);
            }
         
        }


    }


}
    

    





