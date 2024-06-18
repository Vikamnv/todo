const input_add = document.querySelector(".input-add");
const btn_add = document.querySelector("#btn_add");

const tasks = document.querySelector(".tasks");
const all = document.querySelector(".all");
const completed = document.querySelector(".completed");
function createNewTodoItem() {
  const tsk_new = document.createElement("div");
  const tsk_new_block = document.createElement("div");
  const tsk_text_new = document.createElement("div");
  const checked_new = document.createElement("input");
  checked_new.setAttribute('type', 'checkbox');
  const reset_new = document.createElement("button");

  const date_new = document.createElement("div");

  tsk_new.classList.add("task");
  tsk_new_block.classList.add("tsk_new_block");
  tsk_text_new.classList.add("tsk_text");
  checked_new.classList.add("input_checked");
  reset_new.classList.add("reset");
  date_new.classList.add("date");
  const d = new Date();
  date_new.textContent = d.toLocaleDateString("en-CA");

  if (input_add.value.trim()) {
    tsk_text_new.textContent = input_add.value;
    tasks.append(tsk_new);

    tsk_new.append(tsk_new_block, date_new);
    tsk_new_block.append(checked_new, tsk_text_new, reset_new);

    input_add.value = "";
  }
}

btn_add.addEventListener("click", () => {
  {
    createNewTodoItem();
  }
});

input_add.addEventListener("keydown", (key) => {
  if (key.code == "Enter") {
    createNewTodoItem();
  }
});

