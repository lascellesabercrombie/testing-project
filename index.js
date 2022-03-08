const output = document.querySelector("output");
const form = document.querySelector("form");
const input = document.querySelector("input");
const filtered = document.querySelector("#filtered");

let numberOfItems = 0;

form.addEventListener("submit", (event) => addToDoItem(event));

function addToDoItem(event) {
    event.preventDefault();

    numberOfItems +=1;

    const toDoItem = input.value;

    const template = document.querySelector("template");
    const domFragment = template.content.cloneNode(true);

    const checkbox =  domFragment.querySelector("input[type=checkbox]");
    const deleteBtn = domFragment.querySelector("button");

    domFragment.querySelector("article").setAttribute("id", `item-${numberOfItems}`);
    domFragment.querySelector("h2").textContent = toDoItem;
    deleteBtn.addEventListener('click', deleteToDoItem);
    checkbox.addEventListener('change', noteChecker);

    output.appendChild(domFragment);

    form.reset();
}

function noteChecker (e) {
        let note = e.composedPath()[1];
        document.querySelector(`#${note.id} > h2`).classList.toggle("checked");
        if (e.target.checked){
            note.remove();
            filtered.append(note);
        }
        else{
            note.remove();
            output.append(note);
        }        
}


function deleteToDoItem(e) {
    let parentElement = e.composedPath()[1];
    parentElement.remove();
}