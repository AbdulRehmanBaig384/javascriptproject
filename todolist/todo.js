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