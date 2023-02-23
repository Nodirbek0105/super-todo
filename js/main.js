let elForm = document.querySelector("[data-form]");
let elInput = document.querySelector("[data-input]");
let elUl = document.querySelector("[data-ul]");

let a = 1;

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if ((elInput.value).toString().trim() != "") {
    let elDivParent = document.createElement("div");
    let elLi = document.createElement("li");
    let elDiv = document.createElement("div");
    let img = document.createElement("img");
    elDivParent.dataset.parentDiv = "parent-div"
    img.dataset.id = a;
    img.src = "./img/trash.svg";
    a++;
    elDiv.textContent = elInput.value;
    elUl.append(elLi);
    elLi.append(elDivParent);
    elDivParent.append(elDiv, img);
  }
  elInput.value = "";
});

elUl.addEventListener("click", (evt) => {
//   if (evt.target == elUl) return;
  deleteTodo(evt);
});

function deleteTodo(e) {
  let elT = e.target.closest("[data-id]");
  if (!elT) return;
//   if ((elT = elUl.children)) return;
  elT.parentElement.parentElement.remove();
}
