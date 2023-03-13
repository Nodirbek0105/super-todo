let elForm = document.querySelector("[data-form]");
let elInput = document.querySelector("[data-input]");
let elUl = document.querySelector("[data-ul]");
let elTime = new Date();
let elTemplate = document.querySelector("template");
let a = 0;
let todos = [];

renderTodo(getP());

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const todo = {
    id: null,
    title: null,
    createAd: null,
    dueDate: null,
  }; // let time =`${elTime.getFullYear()}:${(elTime.getMonth() + 1).toString().padStart(2, 0)}:${elTime.getDate()}  ${elTime.getHours()}:${elTime.getMinutes()}`
  const formData = new FormData(elForm);
  todo.title = elInput.value;
  todo.id = a;
  id();
  todo.createAd = new Date(Date.now());
  todo.dueDate = new Date(formData.get("dueDate"));
  todos.push(todo);
  renderTodo(todos);
  setP(todos);
});
function createTodo(todo) {
  const elTemp = elTemplate.content.cloneNode(true);
  const dueDate = new Date(todo.dueDate);
  const createAd = new Date(todo.createAd);
  const difTime = new Date(todo.dueDate).getTime() - new Date(Date.now()).getTime();
  elTemp.querySelector(
    "[data-created]"
  ).textContent = `${todo.createAd.toLocaleString()}`; //`${elTime.getFullYear()${(elTime.getMonth() + 1).toString().padStart(2, 0)}:${elTime.getDate()} ${elTime.getHours()}:${elTime.getMinutes()} ${elTime.setDate}`
  elTemp.querySelector(
    "[data-due]"
  ).textContent = `${dueDate.toLocaleDateString()} ${dueDate.toLocaleTimeString()}`; //`${elTime.getFullYear()${(elTime.getMonth() + 1).toString().padStart(2, 0)}:${elTime.getDate()} ${elTime.getHours()}:${elTime.getMinutes()} ${elTime.setDate}`
  elTemp.querySelector("[data-due]").style.backgroundColor = color(difTime);
  elTemp.querySelector("[data-due]").style.color = "white";
  elTemp.querySelector("[data-div]").textContent = todo.title;
  elTemp.querySelector("img").dataset.id = todo.id;
  return elTemp;
}

elUl.addEventListener("click", (evt) => {
  //   if (evt.target == elUl) return;
  deleteTodo(evt);
  setP(todos);
});

function deleteTodo(e) {
  let elT = e.target.closest("[data-id]");
  if (!elT) return;
  let id = elT.dataset.id;
  let index = todos.findIndex((a) => a.id == +id);
  let delteedTodo = todos.splice(index, 1);
  elT.parentElement.parentElement.remove();
  setP(todos);
}

function renderTodo(todos) {
  elUl.innerHTML = "";
  // todos.forEach((todo) => {
  // })
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    elUl.append(createTodo(todo));
  }
  // todos.forEach((todo) => {
  // });
}

function getP() {
  let poke = localStorage.getItem("ad" || "[]");
  let pokem = JSON.parse(poke);
  return pokem;
}
function setP(array) {
  let poke = array;
  let pok = JSON.stringify(poke);
  localStorage.setItem("ad", `${pok}`);
}
function id() {
  return (a += 1);
}

function color(difTime) {
  const day = 1000 * 60 * 60 * 24;
  if (difTime < 1) {
    return "black";
  }
  if (day * 2 < difTime && day * 3 > difTime) {
    return "orange";
  }
  if (day < difTime && day * 2 > difTime) {
    return "yellow";
  }
  if (difTime < day) {
    return "red";
  }
  if (day * 3 < difTime && day * 4 > difTime) {
    return "gold";
  }
  if (difTime > day * 4) {
    return "green";
  }
}
