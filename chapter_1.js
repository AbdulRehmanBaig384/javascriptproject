// //Write a script to greet your visitors using js alert box
 function javascript_question1 (){
alert("hello visitors");}
javascript_question1();


 // question 2)write a script to display the following message in your broswer
function javascript_question2(){
    alert("Error! Please enter a valid password");}
javascript_question2();


 // question 3) write a script to display the following message in your broswer;
function javasript_question3(){
    alert("Welcome to JS land...\n Happy Coding!");
}
javasript_question3();


// QUESTION 4) write a scipt to display the following message in sequence in your broswer
function javascript_question4(){
    alert("Welcome to Js land...")
}
function javascript_question4b(){
    alert("Happy coding! \n Prevent this page from Creating Additional Dialogs.")
}
javascript_question4();
javascript_question4b();

let input_element=document.getElementById("todoinput");

let input_addbutton=document.getElementById("btn");

let input_tasklist=document.getElementById("tasklist");

input_addbutton.addEventListener('click',()=>{
    const task_text=input_element.value.trim();
    
    if(task_text===''){
        
        alert("task cant be empty");
    return;
    }
    const listitem=document.createElement("li");
    
    const taskspan=document.createElement('span');
    
    taskspan.textContent=task_text;

    taskspan.addEventListener('click',()=>{
        
  taskspan.classList.toggle("completed");
        
    });
    const delete_button=document.createElement("button");
    
    delete_button.textContent="delete";
    
    delete_button.style.marginLeft="10px";
    
    delete_button.addEventListener('click',()=>{
        
        listitem.remove();
    });
    listitem.appendChild(taskspan);
    
    listitem.appendChild(delete_button);

    input_tasklist.appendChild(listitem);
    
    input_element.value='';

})

