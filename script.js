// TaskMaster - Accessible To-Do List

const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

let tasks = [];

// Load tasks from localStorage when page loads
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render all tasks to the list
function renderTasks() {
    taskList.innerHTML = ''; // Clear list

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.ariaLabel = `Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`;
        checkbox.addEventListener('change', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks(); // Re-render to update styles
        });

        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) {
            span.style.textDecoration = 'line-through';
            span.style.color = '#28A745'; // Green for completed
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️'; // Trash icon (or use "Delete")
        deleteBtn.ariaLabel = `Delete task "${task.text}"`;
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Add new task
function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}

// Event listeners
addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    taskInput.focus(); // Nice accessibility touch
});

