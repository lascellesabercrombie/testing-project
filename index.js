const output = document.querySelector("output");
const form = document.querySelector("form");
const input = document.querySelector("input");
const filtered = document.querySelector("#filtered");
const loadButton = document.querySelector("#loadStorage");

/*****************Quick Way To Remove The Cookies********************/
//localStorage.removeItem("localNames")
//localStorage.removeItem("numberOfItems")
/********************************************************************/

// Getting items from local storage
let localNames = localStorage.getItem("localNames") 
let numberOfItems = Number(localStorage.getItem("numberOfItems"));

// If items don't exist, create them
if (localNames === null) {
    localNames = {}
} else {
    localNames = JSON.parse(localNames)
    for (let key in localNames) {
        addToDoItem(undefined, localNames[key], key)
    }
}
if (numberOfItems === null) {
    numberOfItems = 0
}


form.addEventListener("submit", (event) => addToDoItem(event));

function addToDoItem(event, localValue, localKey) {
    if(event !== undefined) {
        event.preventDefault();
    }

    // Uses items from the local storage
    let toDoItem = localValue;
    let itemNumber = localKey;

    // Normal part
    if(toDoItem === undefined) {
        toDoItem = input.value;
    }
    if (localKey === undefined) {
        numberOfItems +=1;
        localStorage.setItem("numberOfItems", numberOfItems)
        itemNumber = numberOfItems
    }

    const template = document.querySelector("template");
    const domFragment = template.content.cloneNode(true);

    const checkbox =  domFragment.querySelector("input[type=checkbox]");
    const deleteBtn = domFragment.querySelector("form");
    const arrows = domFragment.querySelectorAll(".arrowBox");
    const upArrow = arrows[0];
    const downArrow = arrows[1];

    domFragment.querySelector("article").setAttribute("id", `item-${itemNumber}`);
    domFragment.querySelector("h2").textContent = toDoItem;
    deleteBtn.setAttribute("id", `delete-${itemNumber}`)
    deleteBtn.addEventListener('submit', (event) => deleteToDoItem(event, itemNumber));
    checkbox.addEventListener('change', (event) => noteChecker(event, itemNumber));
    upArrow.addEventListener("click", moveUp);
    downArrow.addEventListener("click", moveDown);

    output.appendChild(domFragment);

    localNames[numberOfItems] = toDoItem;
    localStorage.setItem(`localNames`, JSON.stringify(localNames));

    form.reset();
}

function noteChecker (e, itemNumber) {
        let note = e.composedPath()[1];
        document.querySelector(`#${note.id} > h2`).classList.toggle("checked");
        if (e.target.checked){
            note.remove();
            filtered.append(note);
            delete localNames[itemNumber];
            localStorage.setItem("localNames", JSON.stringify(localNames));
        }
        else{
            note.remove();
            output.append(note);
            localNames[itemNumber] = toDoItem;
            localStorage.setItem(`localNames`, JSON.stringify(localNames));
        }        
}



function deleteToDoItem(e, itemNumber) {
    e.preventDefault();
    const parentElementId = `item-${itemNumber}`
    const parentElement = document.querySelector(`#${parentElementId}`)
    parentElement.remove();
    delete localNames[itemNumber];
    localStorage.setItem("localNames", JSON.stringify(localNames));
};

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

function moveUp(e) {
    let parentElement = e.composedPath()[1];
    if (parentElement.previousElementSibling !== null) {
        parentElement.parentNode.insertBefore(parentElement, parentElement.previousElementSibling);
    };
};

function moveDown(e) {
    let parentElement = e.composedPath()[1];
    if (parentElement.nextElementSibling !== null) {
        parentElement.parentNode.insertBefore(parentElement.nextElementSibling, parentElement);
    };
};
