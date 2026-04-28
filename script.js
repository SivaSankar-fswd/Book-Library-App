document.addEventListener('DOMContentLoaded', loadTasks);

const addButton = document.getElementById('add');
const todoInput = document.getElementById('todo');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');

addButton.addEventListener('click', addTask);
todoInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach(task => {
    createTaskElement(task);
  });
}

function addTask() {
  const text = todoInput.value.trim();
  if (text === '') return;

  const task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  createTaskElement(task);
  saveTaskToStorage(task);
  todoInput.value = '';
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => toggleComplete(task.id));

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;

  const editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => editTask(task.id, span));

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteTask(task.id));

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  if (task.completed) {
    li.classList.add('completed');
    completedList.appendChild(li);
  } else {
    pendingList.appendChild(li);
  }
}

function toggleComplete(id) {
  const tasks = getTasksFromStorage();
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasksToStorage(tasks);
    location.reload(); // Simple way to refresh the lists
  }
}

function editTask(id, span) {
  const currentText = span.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;
  input.className = 'task-text editing';

  span.replaceWith(input);
  input.focus();

  const saveEdit = () => {
    const newText = input.value.trim();
    if (newText !== '') {
      updateTaskText(id, newText);
      span.textContent = newText;
      input.replaceWith(span);
    } else {
      input.replaceWith(span);
    }
  };

  input.addEventListener('blur', saveEdit);
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      saveEdit();
    }
  });
}

function updateTaskText(id, newText) {
  const tasks = getTasksFromStorage();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.text = newText;
    saveTasksToStorage(tasks);
  }
}

function deleteTask(id) {
  const tasks = getTasksFromStorage();
  const filteredTasks = tasks.filter(t => t.id !== id);
  saveTasksToStorage(filteredTasks);
  const li = document.querySelector(`li[data-id="${id}"]`);
  if (li) li.remove();
}

function getTasksFromStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);
}

function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}