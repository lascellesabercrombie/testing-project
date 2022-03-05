const output = document.querySelector("output");
const form = document.querySelector("form");
const input = document.querySelector("input");

let numberOfItems = 0;

form.addEventListener("submit", (event) => addToDoItem(event));
//document.querySelector('button[name=deleteBtn]').addEventListener('click', deleteToDoItem);

function addToDoItem(event) {
    event.preventDefault();

    numberOfItems +=1;

    const toDoItem = input.value;

    const template = document.querySelector("template");
    const domFragment = template.content.cloneNode(true);

    const deleteBtn = domFragment.querySelector("button")

    domFragment.querySelector("article").setAttribute("id", `item-${numberOfItems}`);
    domFragment.querySelector("h2").textContent = toDoItem;

    //deleteBtn.setAttribute("id", `delete-${numberOfItems}`);
    //deleteBtn.addEventListener('click', deleteToDoItem);

    output.appendChild(domFragment)

    form.reset();
}

/* 
function deleteToDoItem() {

} */