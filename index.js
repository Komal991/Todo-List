let taskBeingEdited = null;

window.onload = function () {
    loadTasks();
    loadCompletedTasks();
};

function addTask() {
    const inputField = document.getElementById("taskInput");
    const taskValue = inputField.value.trim();

    if (taskValue) {
        if (taskBeingEdited) {
            const taskTextElement = taskBeingEdited.querySelector("span");
            const oldTaskValue = taskTextElement.textContent;

            taskTextElement.textContent = taskValue;
            updateTaskInStorage(oldTaskValue, taskValue);

            taskBeingEdited = null;
        } else {
            const taskList = document.getElementById("taskList");
            const taskItem = createTaskElement(taskValue, false);
            taskList.appendChild(taskItem);
            storeTask(taskValue);
        }

        inputField.value = "";
    }
}

function createTaskElement(taskValue, isCompleted) {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;
    checkbox.onchange = () => toggleTaskCompletion(taskItem, taskValue);

    const taskText = document.createElement("span");
    taskText.textContent = taskValue;

    const iconDiv = document.createElement("span");

    const editButton = document.createElement("button");
    editButton.className = "edit-btn";
    editButton.innerHTML = '<i class="fas fa-edit icon"></i>';
    editButton.onclick = () => editTask(taskItem, taskText);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.innerHTML = '<i class="fas fa-trash icon"></i>';
    deleteButton.onclick = () => deleteTask(taskItem, taskValue);

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    iconDiv.appendChild(editButton);
    iconDiv.appendChild(deleteButton);
    taskItem.appendChild(iconDiv);

    return taskItem;
}

function toggleTaskCompletion(taskItem, taskValue) {
    const taskList = document.getElementById("taskList");
    const completedTaskList = document.getElementById("completedTaskList");
    const checkbox = taskItem.querySelector("input[type='checkbox']");

    if (checkbox.checked) {
        taskList.removeChild(taskItem);
        completedTaskList.appendChild(taskItem);
        markTaskAsCompleted(taskValue);
    } else {
        completedTaskList.removeChild(taskItem);
        taskList.appendChild(taskItem);
        markTaskAsIncomplete(taskValue);
    }

    toggleCompletedTasksVisibility();
    checkAllTasksCompleted();
}

function checkAllTasksCompleted() {
    const tasks = getTasksFromStorage();
    const completedTasks = getCompletedTasksFromStorage();

    if (tasks.length === 0 && completedTasks.length > 0) {
        playCheeringSound();
    }
}

function playCheeringSound() {
    const cheeringSound = document.getElementById("cheeringSound");
    cheeringSound.play();
    alert("Well done! All tasks are completed!");
}

function editTask(taskItem, taskText) {
    const inputField = document.getElementById("taskInput");
    inputField.value = taskText.textContent;
    taskBeingEdited = taskItem;
}

function deleteTask(taskItem, taskValue) {
    const taskList = document.getElementById("taskList");
    const completedTaskList = document.getElementById("completedTaskList");

    if (taskList.contains(taskItem)) {
        taskList.removeChild(taskItem);
    } else if (completedTaskList.contains(taskItem)) {
        completedTaskList.removeChild(taskItem);
    }

    removeTaskFromStorage(taskValue);
    removeTaskFromCompletedStorage(taskValue);

    toggleCompletedTasksVisibility();
}

function storeTask(taskValue) {
    let tasks = getTasksFromStorage();
    tasks.push(taskValue);
    localStorage.setItem('tasks', tasks.join('|'));
}

function updateTaskInStorage(oldTaskValue, newTaskValue) {
    let tasks = getTasksFromStorage();
    const taskIndex = tasks.indexOf(oldTaskValue);
    if (taskIndex !== -1) {
        tasks[taskIndex] = newTaskValue;
    }
    localStorage.setItem('tasks', tasks.join('|'));
}

function markTaskAsCompleted(taskValue) {
    removeTaskFromStorage(taskValue);
    let completedTasks = getCompletedTasksFromStorage();
    completedTasks.push(taskValue);
    localStorage.setItem('completedTasks', completedTasks.join('|'));
}

function markTaskAsIncomplete(taskValue) {
    removeTaskFromCompletedStorage(taskValue);
    storeTask(taskValue);
}

function removeTaskFromStorage(taskValue) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task !== taskValue);
    localStorage.setItem('tasks', tasks.join('|'));
}

function removeTaskFromCompletedStorage(taskValue) {
    let completedTasks = getCompletedTasksFromStorage();
    completedTasks = completedTasks.filter(task => task !== taskValue);
    localStorage.setItem('completedTasks', completedTasks.join('|'));
}

function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => {
        const taskList = document.getElementById("taskList");
        const taskItem = createTaskElement(task, false);
        taskList.appendChild(taskItem);
    });
}

function loadCompletedTasks() {
    const completedTasks = getCompletedTasksFromStorage();
    completedTasks.forEach(task => {
        const completedTaskList = document.getElementById("completedTaskList");
        const taskItem = createTaskElement(task, true);
        completedTaskList.appendChild(taskItem);
    });

    toggleCompletedTasksVisibility();
}

function getTasksFromStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? tasks.split('|') : [];
}

function getCompletedTasksFromStorage() {
    const completedTasks = localStorage.getItem('completedTasks');
    return completedTasks ? completedTasks.split('|') : [];
}

function toggleCompletedTasksVisibility() {
    const completedTasks = getCompletedTasksFromStorage();
    const completedTasksCard = document.getElementById("completedTasksCard");

    if (completedTasks.length > 0) {
        completedTasksCard.style.display = "block";

    } else {
        completedTasksCard.style.display = "none";
    }
}
