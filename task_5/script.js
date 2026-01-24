let tasks = [];
let currentFilter = 'all';

const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

addBtn.addEventListener("click", function() {
    if (!taskInput.value) return alert("Please enter a task!");

    const newTask = {
        id: Date.now(),
        text: taskInput.value,
        dueDate: dateInput.value || "No date",
        completed: false
    };

    tasks.push(newTask);
    sortTasks();
    render();
    
    taskInput.value = "";
    dateInput.value = "";
});

function sortTasks() {
    tasks.sort((a, b) => {
        if (a.dueDate === "No date") return 1;
        if (b.dueDate === "No date") return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
    });
}

function setFilter(filterType) {
    currentFilter = filterType;
    render();
}

function render() {
    todoList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === 'completed') return task.completed;
        if (currentFilter === 'pending') return !task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        let li = document.createElement("li");
        if (task.completed) li.style.textDecoration = "line-through";
        
        li.innerHTML = `
            <span>${task.text} (Due: ${task.dueDate})</span>
            <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Done'}</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    render();
}

function toggleComplete(id) {
    let task = tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    render();
}
