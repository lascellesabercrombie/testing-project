const output = document.querySelector("output");
const form = document.querySelector("form");
const input = document.querySelector("input");
const filtered = document.querySelector("#filtered")

let numberOfItems = 0;

form.addEventListener("submit", (event) => addToDoItem(event));
//document.querySelector('button[name=deleteBtn]').addEventListener('click', deleteToDoItem);

function addToDoItem(event) {
    event.preventDefault();

    numberOfItems +=1;

    const toDoItem = input.value;

    const template = document.querySelector("template");
    const domFragment = template.content.cloneNode(true);

    const checkbox =  domFragment.querySelector("input[type=checkbox]");
    const deleteBtn = domFragment.querySelector("button")

    domFragment.querySelector("article").setAttribute("id", `item-${numberOfItems}`);
    domFragment.querySelector("h2").textContent = toDoItem;
    deleteBtn.addEventListener('click', deleteToDoItem);
    checkbox.addEventListener('change', noteChecker);

    output.appendChild(domFragment)

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
    // e.path[0] is the button itself, e.path[1] is the parent element (The to do item) that wants deleting. 
    let parentElement = e.path[1];
    parentElement.remove();
}

// function addStave() {
//     if(filtered.childElementCount>0){
//         console.log('x');
//         let staveDiv = document.createElement('div');
//         let measureDiv = document.createElement('div');
//         measureDiv.classList.add("measure");
//         staveDiv.classList.add("stave");
//         staveDiv.append(measureDiv);
//         filtered.prepend(staveDiv);
//     }
// }
// document.addEventListener("click", addStave);