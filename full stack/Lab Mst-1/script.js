let tasks = [];

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const showAllBtn = document.getElementById("showAll");
const showCompletedBtn = document.getElementById("showCompleted");



addTaskBtn.addEventListener("click", function() {

    const taskName = taskInput.value;

    if(taskName === "") return;

    const task = {
        name: taskName,
        priority: priority.value,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    displayTasks(tasks);
});




function displayTasks(taskArray) {

    taskList.innerHTML = "";

    taskArray.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""}>

        ${task.name} - ${task.priority}

        <button>Delete</button>
        `;

        
        li.querySelector("input").addEventListener("change", function() {
            tasks[index].completed = !tasks[index].completed;
        });

       
        li.querySelector("button").addEventListener("click", function() {
            tasks.splice(index,1);
            displayTasks(tasks);
        });

        taskList.appendChild(li);

    });

}




showAllBtn.addEventListener("click", function(){
    displayTasks(tasks);
});



showCompletedBtn.addEventListener("click", function(){

    const completedTasks = tasks.filter(task => task.completed);

    displayTasks(completedTasks);

});