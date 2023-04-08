let toDoInput // Input
let addBttn // Add one task
let removemAllBttn // Remove all tasks
let taskHTMLList // list
let taskList = [] //JS task list
let taskElements // task element
let taskCount // counts active tasks
let saveBttn // saves tasks
let counter = 0

const prepareDOMElements = () => {
    toDoInput = document.querySelector(".header__input")
    addBttn = document.querySelector(".header__button--add")
    removemAllBttn = document.querySelector(".header__button--remove")
    taskHTMLList = document.querySelector(".tasks")
    taskCount = document.querySelector(".header__counter")
    saveBttn = document.querySelector(".header__button--save")
}

const prepareDOMEvents = () => {
    addBttn.addEventListener("click", addNewTask)
    removemAllBttn.addEventListener("click", removeAllElements)
    taskHTMLList.addEventListener("click", checkClick)
    saveBttn.addEventListener("click", saveTasks)
    countElements()
}

/**
 * Load items from local storage
 */
const loadLocalStorage = () => {
    for (let i = 0; i < localStorage.length; i++) {
        let singleTask = JSON.parse(localStorage.getItem(localStorage.key(i)))
        taskList.push({
            id: counter,
            name: singleTask[0],
            is_done: singleTask[1],
        })
        counter += 1
    }
    localStorage.clear()
    updateHTMLList()
    countElements()
}

/**
 * Save items to local storage
 */
const saveTasks = () => {
    localStorage.clear()
    taskList.forEach((task) => {
        localStorage.setItem(`task_${task.id}`, JSON.stringify([task.name, task.is_done]))
    })
}
/**
 * check if remove/done button was clicked
 * @param {*} e
 */
const checkClick = (e) => {
    let task = e.target.parentElement.querySelector("p").classList[1]
    if (e.target.matches(".task__button--done")) {
        e.target.parentElement.classList.toggle("task--finished")
        if (e.target.innerText === "Done") {
            e.target.innerText = "Revert"
        } else {
            e.target.innerText = "Done"
        }
        taskList.forEach((element) => {
            if (`task__${element.id}` === task) {
                element.is_done = !element.is_done
            }
        })
    } else if (e.target.matches(".task__button--remove")) {
        for (let i = 0; i < taskList.length; i++) {
            if (`task__${taskList[i].id}` === task) {
                taskList.splice(i, 1)
                break
            }
        }
        e.target.parentElement.remove()
    }
    countElements()
}

const updateHTMLList = () => {
    taskHTMLList.innerHTML = ""
    taskList.forEach((element) => {
        taskHTMLList.appendChild(createToDoElement(element))
    })
    countElements()
}

/**
 * create new task elem
 * @param {*} text task name
 * @returns HTML li elem
 */
const createToDoElement = (element) => {
    // Done button
    let doneBttn = document.createElement("button")
    doneBttn.classList.add("task__button", "task__button--done")
    doneBttn.innerText = "done"
    // Remove Button
    let removeBttn = document.createElement("button")
    removeBttn.classList.add("task__button", "task__button--remove")
    removeBttn.innerText = "remove"
    // Task
    let taskText = document.createElement("p")
    taskText.innerText = element.name
    taskText.classList.add("task__text", `task__${element.id}`)
    // Div
    let liElem = document.createElement("li")
    liElem.classList.add("task")
    if (element.is_done) {
        liElem.classList.add("task--finished")
    }
    liElem.appendChild(taskText)
    liElem.appendChild(doneBttn)
    liElem.appendChild(removeBttn)
    return liElem
}
/**
 * count tasks
 */
const countElements = () => {
    taskCount.innerText = `Tasks left: ${taskList.length - document.querySelectorAll(".task--finished").length}`
}
/**
 * add new task to list
 */
const addNewTask = () => {
    if (toDoInput.value === "") {
        toDoInput.classList.add("header__input--empty")
        toDoInput.placeholder = "Input field is empty"
        toDoInput.addEventListener("focusin", () => {
            toDoInput.classList.remove("header__input--empty")
            toDoInput.placeholder = "What's on your mind?"
        })
    } else {
        taskList.push({
            id: counter,
            name: toDoInput.value,
            is_done: false,
        })
        counter += 1
        updateHTMLList()
        countElements()
        toDoInput.value = ""
    }
}
/**
 * Remove all tasks from list
 */
const removeAllElements = () => {
    taskHTMLList.innerHTML = ""
    taskList = []
    countElements()
}

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
    loadLocalStorage()
}
document.addEventListener("DOMContentLoaded", main)
