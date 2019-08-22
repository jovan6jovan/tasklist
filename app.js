// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners function
loadEventListeners();

function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks)
}

// Get tasks (from Local Storage) function
function getTasks() {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create textNode and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // Add fontawesome icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link to the li
        li.appendChild(link);

        // Append li to the ul
        taskList.appendChild(li);
    });
}

// Add task function
function addTask(e) {
    if(taskInput.value === '') {
        alert("Please add a task.");
    }

    // Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // Create textNode and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add fontawesome icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to the li
    li.appendChild(link);

    // Append li to the ul
    taskList.appendChild(li);

    // Store task in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store task function
function storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task function
function removeTask(e) {
    // Klikom na narandzasti iksic, e.target je <i> element, a mi hocemo zapravo <a> element, i zbog toga gadjam sledece u if statement-u
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure you want to delete a task?')) {
            // Delete whole li element (task) from the DOM
            e.target.parentElement.parentElement.remove();

            // Remove task from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from Local Storage function
function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks function
function clearTasks() {
    taskList.innerHTML = '';

    // Clear from local storage
    cleareTasksFromLocalStorage();
}

// Clear tasks from local storage function
function cleareTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter tasks function 
function filterTasks(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}