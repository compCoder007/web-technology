init();
test();



function init(){
    qnumber=[1,2,3,4];
    quesions = ["one","two","three","four"];
    answers = ['C','D','A','B'];
    options = {0:[11,12,13,14],1:[21,22,23,24],2:[31,32,33,34],3:[41,42,43,44]};
    usr_ans = new Array(quesions.length);
    for(let k=0;k<usr_ans.length;k++){
        usr_ans[k]=-1;
    }
    i=0;

    show_options(0);    
}

function test(){

    document.getElementById("next").addEventListener("click",function(){
        save_answer(i);
        i=(i+1)%quesions.length;
        show_options(i);
        document.getElementById("reset").click();
        if(usr_ans[i]!=-1){
            document.getElementById(usr_ans[i].id).checked=true;
        }
    });
    document.getElementById("previous").addEventListener("click",function(){
        save_answer(i);
        i=i>0?i-1:quesions.length-1;
        show_options(i);
        document.getElementById("reset").click();
        if(usr_ans[i]!=-1){
            document.getElementById(usr_ans[i].id).checked=true;
        }
    });
    document.getElementById("submit").onclick = submit_quiz;
    document.getElementById("exit").onclick = function(){
        location.reload();
    };
    

}

function save_answer(i){
    let flag=0;
    radios = document.querySelectorAll('input[name="option"]');
    for(const radioButton of radios){
        if(radioButton.checked){
            flag=1;
            usr_ans[i]=radioButton;
        }
    }
    if(flag==0) usr_ans[i]=-1;
    
}

function show_options(i){

    document.getElementById("qno").innerHTML=qnumber[i];
    document.getElementById("question").innerHTML=quesions[i];

    let j=0;
    radioLabels = document.querySelectorAll('.radio');
    for(const rlabel of radioLabels){
        rlabel.innerHTML = options[i][j];
        j++;
    }
}

function submit_quiz(){
    
    save_answer(i);
    radios = document.querySelectorAll('input[name="option"]');
    for(const radio of radios){
        radio.disabled='true';
    }
    document.getElementById("reset").style.visibility="hidden";
    show_answer(i);
    document.getElementById("next").addEventListener("click",function(){
        show_answer(i);
    });
    document.getElementById("previous").addEventListener("click",function(){
        show_answer(i);
    });

    


    report();
}

function calculate_result(){
    let points=0;
    for(let j=0;j<usr_ans.length;j++){
        if(usr_ans[j].value==answers[j]){
            points+=1;
        }
    }
    return points;
}

function show_answer(i){
    labels = document.querySelectorAll('.radio');
    
    for(const label of labels){
        if(label.id == usr_ans[i].value && usr_ans[i].value!=answers[i]){label.style.backgroundColor="red"}
        else if(label.id == answers[i]){label.style.backgroundColor="lime"}
        else {label.style.backgroundColor="white"}
    }
    if(usr_ans[i].value==answers[i]){
        document.getElementById("feedback").style.color="green";
        document.getElementById("feedback").innerHTML="Correct Answer! You got 1 point";
    }
    else{
        document.getElementById("feedback").style.color="red";
        document.getElementById("feedback").innerHTML="Wrong Answer! You got 0 points";
    }
}

function report(){
    document.getElementById("test_page").style.visibility="hidden";

    const htag = document.createElement("h2");
    htag.innerHTML="You've scored "+calculate_result()+" out of "+quesions.length+"!";
    

    const but = document.createElement("button");
    text = document.createTextNode("View Answers");
    but.appendChild(text);
    document.getElementById("report").append(htag,but);

    but.onclick=function(){
        document.getElementById("submit").innerHTML="View ScoreCard";
        document.getElementById("test_page").style.visibility="visible";
        document.getElementById("report").removeChild(htag);
        document.getElementById("report").removeChild(but);
        
    };
}

function generate_report(){
    document.getElementById("report").ap
}