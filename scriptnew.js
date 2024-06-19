const todoTemplate = document.querySelector("[data-todo-item-template]");
const deleteAll = document.querySelector("[data-button-delete-all]");
const deleteLast = document.querySelector("[data-button-delete-last]");
const btnAdd = document.querySelector("[data-btn_add]");
const inputAdd = document.querySelector("[data-input-add]");
const showAll = document.querySelector("[data-button-show-all]");
const showComp = document.querySelector("[data-button-show-comp]");
const inputSearch = document.querySelector("[data-input-search]");
const tasksContainer = document.querySelector("[data-tasks]");
const template = document.querySelector("[data-todo-item-template]");
const all = document.querySelector("[data-all]");
const completed = document.querySelector("[data-completed]");
const LOCAL_STORAGE_KEY = "todos";

let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

btnAdd.addEventListener("click", () => {
  if (inputAdd.value.trim()) {
    const newTodo = {
      id: todos.length + 1,
      text: inputAdd.value.trim(),
      date: new Date(),
      completed: false,
    };
    todos.push(newTodo);
    inputAdd.value = "";
  }

  render();
});

inputAdd.addEventListener("keydown", (key) => {
  if (key.code == "Enter" && inputAdd.value.trim()) {
    const newTodo = {
      id: todos.length + 1,
      text: inputAdd.value.trim(),
      date: new Date(),
      completed: false,
    };
    todos.push(newTodo);
    inputAdd.value = "";
  }
  render();
});

function createTodoItem(id, text, date, completed) {
  const todoItem = document.importNode(template.content, true);
  const todoText = todoItem.querySelector("[data-task-text]");
  todoText.textContent = text;
  const todoDate = todoItem.querySelector("[data-task-date]");
  const checkbox = todoItem.querySelector("[data-task-checkbox]");
  checkbox.checked = completed;

  todoDate.textContent = new Date(date).toLocaleDateString("en-CA");

  const btn_reset = todoItem.querySelector("[data-task-reset]");
  checkbox.addEventListener("change", () => {
    const todo = todos.find((el) => el.id === id);
    todo.completed = checkbox.checked;
    render();
  });
  btn_reset.addEventListener("click", () => {
    todos = todos.filter((el) => el.id !== id);
    render();
  });
  return todoItem;
}

deleteAll.addEventListener("click", () => {
  todos = [];
  localStorage.clear();
  render();
});
deleteLast.addEventListener("click", () => {
  todos.splice(-1);
  render();
});

function clearTodoContainer() {
  tasksContainer.innerHTML = "";
}
function appendTodos() {
  if (todos.length) {
    todos.forEach((el) => {
      const todo = createTodoItem(el.id, el.text, el.date, el.completed);
      tasksContainer.append(todo);
    });
  }
}

function search(searchValue) {
  return todos.filter((el) =>
    el.text.toLowerCase().includes(searchValue.toLowerCase())
  );
}
function displaySearch(todoArr) {
  clearTodoContainer();

  if (todoArr.length) {
    todoArr.forEach((el) => {
      const todo = createTodoItem(el.id, el.text, el.date, el.completed);
      tasksContainer.append(todo);
    });
  }
}

inputSearch.addEventListener("input", () => {
  const searchValue = inputSearch.value;

  if (searchValue) {
    const result = search(searchValue);
    displaySearch(result);
  } else {
    render();
  }
});

showAll.addEventListener("click", () => {
  render();
});

showComp.addEventListener("click", () => {
  displayCompletedTodos();
});

function displayCompletedTodos() {
  const completedTodos = todos.filter((el) => el.completed);
  clearTodoContainer();
  if (completedTodos.length) {
    completedTodos.forEach((el) => {
      const todo = createTodoItem(el.id, el.text, el.date, el.completed);
      tasksContainer.append(todo);
    });
  }
}

function countAll() {
  all.textContent = `All: ${todos.length}`;
}
function countCompleted() {
  const completedNumber = todos.filter((el) => el.completed);
  completed.textContent = `Completed: ${completedNumber.length}`;
}

function render() {
  clearTodoContainer();
  appendTodos();
  countAll();
  countCompleted();
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
}
render();
