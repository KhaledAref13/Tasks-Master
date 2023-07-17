const addTask = document.querySelector('.add-task');
const closeTask = document.querySelector('.close-task');
const header = document.querySelector('.header');
const taskName = document.querySelector('.task-name');
const formAddTaskBtn = document.querySelector('.form-add-task');
const formEditTaskBtn = document.querySelector('.form-edit-task');
const allTaskDiv = document.querySelector('.all-tasks');

let tasks = [];

const getFromLocalStorage = (tasks) => JSON.parse(localStorage.getItem(tasks))
const setInLocalStorage = (tasks, tasksArray) => localStorage.setItem(tasks, JSON.stringify(tasksArray))

if (localStorage.getItem('tasks')) {
    tasks = getFromLocalStorage('tasks')
}

const displayAddTaskBtn = () => {
    addTask.style.display = 'none'
    closeTask.style.display = 'block'
}

const displayCloseTaskBtn = () => {
    addTask.style.display = 'block'
    closeTask.style.display = 'none'
}

const showHeader = () => {
    header.classList.add('show')
    displayAddTaskBtn()
}

const removeHeader = () => {
    header.classList.remove('show')
    displayCloseTaskBtn()
}

const displayFormAddTaskBtn = () => {
    formAddTaskBtn.style.display = 'block'
    formEditTaskBtn.style.display = 'none'
}

addTask.addEventListener('click', () => {
    showHeader()
    displayFormAddTaskBtn()
})

closeTask.addEventListener('click', () => {
    removeHeader()
    taskName.value = '';
})

const addTaskFunc = () => {
    const getTaskName = taskName.value.trim();
    const task = {
        id: Date.now(),
        title: getTaskName,
        completed: false,
    }
    tasks.push(task);
    setInLocalStorage('tasks', tasks)
    createTaskDom(tasks);
    taskName.value = '';
    removeHeader()
}

const createTaskDom = (tasks) => {
    allTaskDiv.innerHTML = ''
    if (!tasks.length) {
        emptyTasksDiv()
    }
    else {
        tasksHeader()
    }
    tasks.forEach((task) => {
        const taskDiv = createElement('div', 'task')
        const taskStatusTitle = createElement('div', 'task-status-title')
        const taskStatus = createElement('input', 'task-status');
        taskStatus.type = 'checkbox';
        taskStatus.addEventListener('input', () => {
            changeStatus(task.id)
        })
        if (task.completed) {
            taskStatus.checked = true;
        } else {
            taskStatus.checked = false;
        }
        const taskTitle = createElement('p', 'task-title', task.title)
        taskTitle.title = task.title
        if (task.completed) {
            taskTitle.style.textDecoration = 'line-through'
        } else {
            taskTitle.style.textDecoration = 'none'
        }
        taskStatusTitle.append(taskStatus, taskTitle)
        const taskActions = createElement('div', 'task-actions');
        const editIcon = createElement('i', 'fa-solid fa-pen');
        editIcon.addEventListener('click', () => editFunction(task.id))
        const deleteIcon = createElement('i', 'fa-solid fa-trash');
        deleteIcon.addEventListener('click', () => deleteFunction(task.id))
        taskActions.append(editIcon, deleteIcon)
        taskDiv.append(taskStatusTitle, taskActions)
        allTaskDiv.append(taskDiv)
    })
}

const emptyTasksDiv = () => {
    const emptyDiv = createElement('div', 'empty-div')
    const emptyImg = createElement('img', 'empty-img img-fluid')
    emptyImg.src = './images/undraw_shared_goals_re_jvqd.svg'
    emptyImg.alt = 'Tasks'
    const emptyText = createElement('p', 'empty-content', 'Add New Task')
    emptyDiv.append(emptyImg, emptyText)
    allTaskDiv.append(emptyDiv)
}

const tasksHeader = () => {
    const taskHeader = createElement('div', 'tasks-header')
    const taskHeaderTitle = createElement('h3', '', 'Your Tasks')
    const taskHeaderTotal = createElement('p', 'total-tasks', `${completedTaskLength()} From ${tasks.length}`)
    taskHeader.append(taskHeaderTitle, taskHeaderTotal)
    allTaskDiv.append(taskHeader)
}

const completedTaskLength = () => {
    return tasks.filter((task) => task.completed === true).length
}

createTaskDom(tasks);

formAddTaskBtn.addEventListener('click', () => {
    if (!taskName.value) {
        alert('Task name required')
        return;
    }
    addTaskFunc();
})

const deleteFunction = (id) => {
    const deleteTask = tasks.filter((task) => task.id !== id);
    setInLocalStorage('tasks', deleteTask)
    tasks = getFromLocalStorage('tasks')
    createTaskDom(tasks);
}

const displayFormEditTaskBtn = () => {
    formAddTaskBtn.style.display = 'none'
    formEditTaskBtn.style.display = 'block'
}

const editFunction = (id) => {
    showHeader()
    displayFormEditTaskBtn()
    tasks.forEach((task) => {
        if (task.id === id) {
            taskName.value = task.title.trim();
        } else {
            return task
        }
    })
    formEditTaskBtn.onclick = () => editedTask(id)
}

const editedTask = (id) => {
    if (taskName.value) {
        tasks.map((task) => {
            if (task.id === id) {
                task.title = taskName.value;
                setInLocalStorage('tasks', tasks)
                createTaskDom(tasks)
            }
        })
        taskName.value = '';
        removeHeader()
    }
    else if (!taskName.value) {
        removeHeader()
    }
}

const changeStatus = (id) => {
    tasks.map((task) => {
        if (task.id === id) {
            if (!task.completed) {
                task.completed = true
            } else {
                task.completed = false
            }
        }
    })
    createTaskDom(tasks)
    setInLocalStorage('tasks', tasks)
}