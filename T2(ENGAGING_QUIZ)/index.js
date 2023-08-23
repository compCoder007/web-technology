startQuiz();



function startQuiz(){
    
    welcome();

    quesions = [
        "Who is known as 'Run Machine' in Indian cricket?",
        "India's largest city by Population",
        "India's National Aquatic Animal",
        "Indian Standard Time is",
        "What are the dimensions of Indian Flag?"        
    ];
    answers = ['C','B','A','B','A'];
    options = {
        0:['Sachin Tendulkar','M S Dhoni','Virat Kohli','Yuvaraj Singh'],
        1:['Delhi','Mumbai','Chennai','Pune'],
        2:['River Dolphin','Crocodile','Katla Fish','Green Frog'],
        3:['+06:30','+05:30','-05:15','+05:00'],
        4:['900x600','1080x720','600x400','1360x1290']
    };
    usr_ans = new Array(quesions.length);
    for(let k=0;k<usr_ans.length;k++){
        usr_ans[k]=-1;
    }
    current_index=0;
    is_submitted=false;
    show_options(0);


    
    document.querySelectorAll("label").forEach((item) => {
        item.addEventListener('click', function(){
            if(is_submitted==false){
                document.getElementById("reset").click();
            item.style.backgroundColor="#999";
            item.style.color="#fff";
            }
        })
    });

    document.getElementById("reset").addEventListener("click",function(){
        radioLabels = document.querySelectorAll('.radio');
        for(const rlabel of radioLabels){
            rlabel.style.backgroundColor="#fff";
            rlabel.style.color="#222";
        }
        
    });

    document.getElementById("next").addEventListener("click",function(){
        save_answer(current_index);
        current_index=(current_index+1)%quesions.length;
        document.getElementById("reset").click();
        show_options(current_index);
        if(usr_ans[current_index]!=-1){
            document.getElementById(usr_ans[current_index].id).checked=true;
            document.querySelector('label[for='+usr_ans[current_index].id+']').style.backgroundColor="#999";
            document.querySelector('label[for='+usr_ans[current_index].id+']').style.color="#fff";
        }
    });
    document.getElementById("previous").addEventListener("click",function(){
        save_answer(current_index);
        current_index=current_index>0?current_index-1:quesions.length-1;
        document.getElementById("reset").click();
        show_options(current_index);
        if(usr_ans[current_index]!=-1){
            document.getElementById(usr_ans[current_index].id).checked=true;
            document.querySelector('label[for='+usr_ans[current_index].id+']').style.backgroundColor="#999";
            document.querySelector('label[for='+usr_ans[current_index].id+']').style.color="#fff";
        }
    });
    document.getElementById("submit").onclick = submit_quiz;
    document.getElementById("exit").onclick = function(){
        is_submitted=false;
        location.reload();
    };
    
}

function welcome(){
    document.getElementById("test_page").style.display="none";
    
    const htag = document.createElement("h2");
    htag.style.color="#001e4d";
    htag.innerHTML="Welcome!";
    

    const but = document.createElement("button");
    but.setAttribute("id","view_ans");
    text = document.createTextNode("Start Quiz");
    but.appendChild(text);
    document.getElementById("report").append(htag,but);

    but.onclick=function(){
        
        document.getElementById("test_page").style.display="";
        document.getElementById("report").style.display="none";
        document.getElementById("report").removeChild(htag);
        document.getElementById("report").removeChild(but);
        
    };
}

function show_options(current_index){
    document.getElementById("question").innerHTML=quesions[current_index];

    let j=0;
    radioLabels = document.querySelectorAll('.radio');
    for(const rlabel of radioLabels){
        rlabel.innerHTML = options[current_index][j];
        j++;
    }
}

function submit_quiz(){

    is_submitted=true;
    save_answer(current_index);
    radios = document.querySelectorAll('input[name="option"]');
    for(const radio of radios){
        radio.disabled='true';
    }
    document.getElementById("reset").style.visibility="hidden";
    show_answer(current_index);
    document.getElementById("next").addEventListener("click",function(){
        show_answer(current_index);
    });
    document.getElementById("previous").addEventListener("click",function(){
        show_answer(current_index);
    });
    while(current_index!=0){document.getElementById("next").click()}
    document.querySelectorAll("label").forEach((item) => {
        item.disabled=true;
    });

    report();
}

function save_answer(current_index){
    let flag=0;
    radios = document.querySelectorAll('input[name="option"]');
    for(const radioButton of radios){
        if(radioButton.checked){
            flag=1;
            usr_ans[current_index]=radioButton;
        }
    }
    if(flag==0) usr_ans[current_index]=-1;
    
}

function show_answer(current_index){
    labels = document.querySelectorAll('.radio');
    
    for(const label of labels){
        if(label.id == usr_ans[current_index].value && usr_ans[current_index].value!=answers[current_index]){label.style.backgroundColor="red"}
        else if(label.id == answers[current_index]){label.style.backgroundColor="lime"}
        else {label.style.backgroundColor="white"}
    }
    if(usr_ans[current_index].value==answers[current_index]){
        document.getElementById("feedback").style.color="green";
        document.getElementById("feedback").innerHTML="Correct Answer! You got 1 point";
    }
    else{
        if(usr_ans[current_index]==-1){
            document.getElementById("feedback").style.color="red";
            document.getElementById("feedback").innerHTML="Unattempted! You got 0 points";
        }
        else{
            document.getElementById("feedback").style.color="red";
            document.getElementById("feedback").innerHTML="Wrong Answer! You got 0 points";
        }
        
    }
}

function report(){
    
    document.getElementById("report").style.display="";
    document.getElementById("test_page").style.display="none";
    


    const htag = document.createElement("h2");
    htag.style.color="#001e4d";
    htag.innerHTML="You've scored "+calculate_result()+" out of "+quesions.length+"!";
    

    const but = document.createElement("button");
    but.setAttribute("id","view_ans");
    text = document.createTextNode("View Answers");
    but.appendChild(text);
    document.getElementById("report").append(htag,but);

    but.onclick=function(){
        
        document.getElementById("test_page").style.display="";
        document.getElementById("submit").innerHTML="View ScoreCard";
        document.getElementById("submit").style.width="200px";
        document.getElementById("test_page").style.visibility="visible";
        document.getElementById("report").removeChild(htag);
        document.getElementById("report").removeChild(but);
        
    };
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