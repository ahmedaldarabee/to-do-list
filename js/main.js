let taskParent = document.querySelector(".tasks");
let arrTask = [];

let taskContent = localStorage.getItem("taskcontent");
taskContent !== null ? arrTask = JSON.parse(taskContent) :  arrTask = [];

function creatingTask(name){
    return dataTask = {
        "title" : name,
        "date"  : currentDay(),
        "fullTime":currentHour(),
        "isDone" : false
    }
}

function readingFn(){
    let contentBox = '';
    taskParent.innerHTML = '';
    for(let i = 0 ; i < arrTask.length ; i++){
        contentBox += contentFn(i);
    }
    taskParent.innerHTML = contentBox;
    deleteTasks();
}

function contentFn(index){
    return `
        <div class="box">
            <div class="content flex-between ${arrTask[index].isDone ? 'isCompleted' : ''} ">
                <div class="task-name">
                    <h4>${arrTask[index].title}</h4>
                    <div class="time">
                        <i class="fa-solid fa-clock"></i>
                        <span class="current-time">${arrTask[index].fullTime}</span> <span> | ${arrTask[index].date}</span>
                    </div>
                </div>
                <div class="task-icon">
                    <ul class="flex-center">
                        <li><i class="fa-solid fa-pen-to-square" onclick='updateTask(${index})'></i></li>
                        <li><i class="fa-solid fa-trash" onclick='deleteTask(${index})'></i></li>
                        <li class="changeIcon"><i class="fa-solid ${arrTask[index].isDone ? 'fa-check' : 'fa-x'}" onclick='completeTask(${index})' title='${arrTask[index].isDone ? 'End task!' : 'Not ended task!'}'></i></li>
                    </ul>
                </div>    
            </div>
        </div>
    `
}

function newTask(){
    document.querySelector(".addBtn").addEventListener("click",function(){
        let mainMessage = `Add New Task: `;
        manageMessage(mainMessage,'new task');
    })
    storeTask();
}

newTask();

function currentDay(){
    let date = new Date();
    return (+date.getDate()) + '/' + (+date.getMonth()+1) + '/' + (+date.getFullYear());
}

function currentHour(){
    let currentDate = new Date();
    let currentTime = (+currentDate.getHours() % 12) + ':' + (+currentDate.getMinutes());
    let pmAm = currentDate.getHours() < 1 ? ' am' : ' pm';
    return currentTime + pmAm;
}

function deleteTask(index){
    manageDeleteMessage(`You won't be delete [ ${arrTask[index].title} ] task?`,'one',index);
}

function updateTask(index){
    let mainMessage = `Update ${arrTask[index].title} Task: `;
    manageMessage(mainMessage,'update',index);
    storeTask();
}

function manageMessage(mainMessage,operation,index = 0){
    return Swal.fire({
        title: mainMessage,
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
        preConfirm: (inputMessage) => {
            operation === 'update' ? arrTask[index].title = inputMessage : arrTask.push(creatingTask(inputMessage));
            storeTask();
        },
    })
}

function manageDeleteMessage(message,operation,index = 0){
    Swal.fire({
        title: "Are you sure?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            if(operation === 'all'){
                localStorage.clear();
                arrTask = [];
                readingFn();
            }else{
                arrTask.splice(index,1);
                storeTask();
            }
            Swal.fire({
                title: "Done!",
                text: "Your task has been deleted.",
                icon: "success"
            });
        }
    });
}

function completeTask(index) {
    arrTask[index].isDone = !arrTask[index].isDone;
    storeTask();
}

function storeTask(){
    localStorage.setItem("taskcontent",JSON.stringify(arrTask));
    readingFn();
}

function deleteTasks(){
    let deleteParent = document.querySelector(".deleteAllBtn");
    if(arrTask.length >= 2){
        deleteParent.style.display ='block';
        document.querySelector(".deleteAllBtn button").addEventListener("click",function(){
            manageDeleteMessage('Delete all tasks?','all');
        })
    }else{
        deleteParent.style.display ='none';
    }
}