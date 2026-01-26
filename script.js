// TaskMaster – Accessible To-Do List (Upgraded Version)

// ===== DOM ELEMENTS =====
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('error-message');
const filterButtons = document.querySelectorAll('[data-filter]');

// ===== STATE =====
let tasks = [];
let currentFilter = 'all';

// ===== LOAD & SAVE =====
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ===== RENDER =====
function renderTasks() {
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'completed') return task.completed;
    if (currentFilter === 'active') return !task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement('li');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute(
      'aria-label',
      `Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`
    );

    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    // Task text
    const span = document.createElement('span');
    span.textContent = task.text;

    if (task.completed) {
      span.style.textDecoration = 'line-through';
      span.style.color = '#28A745';
    }

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.setAttribute('aria-label', `Delete task "${task.text}"`);

    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// ===== ADD TASK =====
function addTask() {
  const text = taskInput.value.trim();

  if (text === '') {
    showError('Please enter a task before adding.');
    return;
  }

  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = '';
  clearError();
  saveTasks();
  renderTasks();
}

// ===== ERROR HANDLING (ACCESSIBLE) =====
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.setAttribute('role', 'alert');
}

function clearError() {
  errorMessage.textContent = '';
}

// ===== FILTERING =====
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

// ===== EVENTS =====
addButton.addEventListener('click', addTask);

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  taskInput.focus();
});
