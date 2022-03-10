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
}
if (numberOfItems === null) {
    numberOfItems = 0
}
// Only load the local storage after the tests have completed so they don't affect results
document.addEventListener("TESTS-COMPLETE", loadLocal)
function loadLocal() {
    for (let key in localNames) {
        addToDoItem(undefined, localNames[key], key)
    }   
}

form.addEventListener("submit", (event) => addToDoItem(event));

function addToDoItem(event, localValue, localKey) {
    if(event !== undefined) {
        event.preventDefault();
    }

    // Uses items from the local storage
    let toDoItem = localValue;
    let itemNumber = localKey;

    // When normal addition to the list
    if(toDoItem === undefined) {
        toDoItem = input.value;
        numberOfItems +=1;
        itemNumber = numberOfItems;
        localNames[numberOfItems] = toDoItem;
        localStorage.setItem(`localNames`, JSON.stringify(localNames));
        localStorage.setItem("numberOfItems", itemNumber)
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
    checkbox.setAttribute("id", `checkbox-${itemNumber}`);
    domFragment.querySelector(`#item-${itemNumber} > label`).setAttribute("for", checkbox.id)
    
    deleteBtn.setAttribute("id", `delete-${itemNumber}`)
    deleteBtn.addEventListener('submit', (event) => deleteToDoItem(event, itemNumber));
    checkbox.addEventListener('change', (event) => noteChecker(event, itemNumber));
    upArrow.addEventListener("click", moveUp);
    downArrow.addEventListener("click", moveDown);

    output.appendChild(domFragment);

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
            localNames[itemNumber] = note.children[3].innerHTML
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

// Allows user to use move up and down when highlighting element and pressing enter
function handleEnter(e){
    if (e.key == 'Enter') {
      document.activeElement.click();
    }
}

