// Переменные приложения
const applicationState = {
    timerInterval: null,
    remainingTime: 1500,
    isTimerActive: false,
    currentTimerMode: 'work'
};

// DOM элементы
const elements = {
    timerDisplay: document.getElementById('timerDisplay'),
    startButton: document.getElementById('startTimer'),
    pauseButton: document.getElementById('pauseTimer'),
    resetButton: document.getElementById('resetTimer'),
    taskInput: document.getElementById('taskInput'),
    addTaskButton: document.getElementById('addTask'),
    taskList: document.getElementById('taskList')
};

// Функции таймера
function initializeTimer() {
    updateTimerDisplay();
    setupEventListeners();
}

function setupEventListeners() {
    elements.startButton.addEventListener('click', handleStartTimer);
    elements.pauseButton.addEventListener('click', handlePauseTimer);
    elements.resetButton.addEventListener('click', handleResetTimer);
    elements.addTaskButton.addEventListener('click', handleAddTask);
    elements.taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddTask();
    });
}

function handleStartTimer() {
    if (!applicationState.isTimerActive) {
        applicationState.isTimerActive = true;
        applicationState.timerInterval = setInterval(processTimerTick, 1000);
        updateTimerControls();
    }
}

function handlePauseTimer() {
    applicationState.isTimerActive = false;
    clearInterval(applicationState.timerInterval);
    updateTimerControls();
}

function handleResetTimer() {
    handlePauseTimer();
    applicationState.remainingTime = 1500;
    updateTimerDisplay();
}

function processTimerTick() {
    if (applicationState.remainingTime > 0) {
        applicationState.remainingTime--;
        updateTimerDisplay();
    } else {
        handleTimerCompletion();
    }
}

function handleTimerCompletion() {
    handlePauseTimer();
    alert('Таймер завершил работу! Время для перерыва.');
    applicationState.remainingTime = 300;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(applicationState.remainingTime / 60);
    const seconds = applicationState.remainingTime % 60;
    elements.timerDisplay.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTimerControls() {
    elements.startButton.disabled = applicationState.isTimerActive;
    elements.pauseButton.disabled = !applicationState.isTimerActive;
}

// Функции управления задачами
function handleAddTask() {
    const taskDescription = elements.taskInput.value.trim();
    if (taskDescription) {
        createTaskElement(taskDescription);
        elements.taskInput.value = '';
        elements.taskInput.focus();
    }
}

function createTaskElement(description) {
    const taskElement = document.createElement('li');
    taskElement.className = 'task-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.addEventListener('change', function() {
        taskElement.style.opacity = this.checked ? '0.6' : '1';
    });
    
    const taskText = document.createElement('span');
    taskText.textContent = description;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'timer-btn';
    deleteButton.style.marginLeft = 'auto';
    deleteButton.style.padding = '5px 10px';
    deleteButton.style.fontSize = '0.8em';
    deleteButton.addEventListener('click', function() {
        taskElement.remove();
    });
    
    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(deleteButton);
    elements.taskList.appendChild(taskElement);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initializeTimer);
