//Adding items tests
console.group("Adding Tests");

test("Submitting a new task adds it to the list", () => {
    // Add test item
    const input = document.querySelector("#toDoInput");
    input.value = "TEST ITEM"

    //submit test item
    const submitButton = document.querySelector("#addSubmit");
    submitButton.click();

    // Looks at the inner html of the items name
    const result = document.querySelector("#item-1 > h2");
    equal(result.textContent, 'TEST ITEM')

    //resets the output and the number of items
    numberOfItems = 0;
    output.innerHTML = '';
});

test("Submitting 2 new tasks adds them to the list", () => {
    // Add test item 1
    const input = document.querySelector("#toDoInput");
    input.value = "TEST ITEM 1"

    // Submit test item 1
    const submitButton = document.querySelector("#addSubmit");
    submitButton.click();

    // Add test item 2
    input.value = "TEST ITEM 2"

    // Submit test item 2
    submitButton.click();

    // Check results in the HTML
    const result1 = document.querySelector("#item-1 > h2");
    const result2 = document.querySelector("#item-2 > h2");
    equal(result1.textContent, 'TEST ITEM 1');
    equal(result2.textContent, 'TEST ITEM 2');

    numberOfItems = 0;
    output.innerHTML = '';
});


console.groupEnd();
// End of adding items tests

// Checking off items tests
console.group("Checked Items Tests");

test("Clicking checkbox checks item", () => {
    //add test item
    const input = document.querySelector("#toDoInput");
    input.value = "TEST ITEM 1"
    
    //submit item
    const submitButton = document.querySelector("#addSubmit");
    submitButton.click();

    //check item
    const checkButton = document.querySelector("#item-1 > input[type=checkbox]")
    checkButton.click();

    //test
    equal(checkButton.checked, true);

    //reset
    checkButton.click();
    numberOfItems = 0;
    output.innerHTML = '';
    form.reset();
})

test("Clicking checkbox a second time unchecks it", () => {
    //add input
    const input = document.querySelector("#toDoInput");
    input.value = "TEST ITEM 1"

    //submit
    const submitButton = document.querySelector("#addSubmit");
    submitButton.click();
    
    //check twice
    const checkButton = document.querySelector("#item-1 > input[type=checkbox]")
    checkButton.click();
    checkButton.click();

    //test
    equal(checkButton.checked, false);

    //reset
    numberOfItems = 0;
    output.innerHTML = '';
    form.reset();
})

test("With multiple items, checking one items strikes through the correct item", () => {
    
    //add first input
    const input = document.querySelector("#toDoInput");
    input.value = "TEST ITEM 1"

    //submit first input
    const submitButton = document.querySelector("#addSubmit");
    submitButton.click();

    // Add second input
    input.value = "TEST ITEM 2"

    // Submit second input
    submitButton.click();

    //access input text
    const input1Title = document.querySelector("#item-1 > h2")
    const input2Title = document.querySelector("#item-2 > h2")
    
    //check items
    const checkButton = document.querySelector("#item-1 > input[type=checkbox]")
    checkButton.click();
    
    //test
    equal(input1Title.classList.contains("checked"), true);
    equal(input2Title.classList.contains("checked"), false);
    
    //reset
    checkButton.click();
    numberOfItems = 0;
    output.innerHTML = '';
    form.reset();
})

console.groupEnd();
// End of checking off items tests

// Deleting items tests
console.group("Deleting Tests");

test("Deleting the only entry removes it from the list", () => {
    // Add a test Item
    const input = document.querySelector("#toDoInput");
    input.value = "TEST ITEM 1";

    const submitButton = document.querySelector("#addSubmit");
    submitButton.click();

    // Delete the item
    const deleteBtn = document.querySelectorAll("button")[1]
    deleteBtn.click();

    const actual = output.childElementCount;
    const expected = 0
    equal(actual, expected);

    numberOfItems = 0;
    output.innerHTML = '';
});

test("Deleting both entries removes them from the list", () => {
    const input = document.querySelector("#toDoInput");
    const submitButton = document.querySelector("#addSubmit");

    // Add a test Item
    input.value = "TEST ITEM 1";

    // Submit first test item
    submitButton.click();

    // Add second test item
    input.value = "TEST ITEM 2";

    // Submit second test item
    submitButton.click(); 

    // Delete the items
    const deleteBtn1 = document.querySelectorAll("button")[1];
    const deleteBtn2 = document.querySelectorAll("button")[2];
    deleteBtn1.click();
    deleteBtn2.click();


    const actual = output.childElementCount;
    const expected = 0
    equal(actual, expected);

    numberOfItems = 0;
    output.innerHTML = '';
});

test("Deleting the first entries removes it from the list but leaves subsequent entries", () => {
    const input = document.querySelector("#toDoInput");
    const submitButton = document.querySelector("#addSubmit");

    // Add a test Item
    input.value = "TEST ITEM 1";

    // Submit first test item
    submitButton.click();

    // Add second test item
    input.value = "TEST ITEM 2";

    // Submit second test item
    submitButton.click(); 

    // Delete the items
    const deleteBtn = document.querySelectorAll("button")[1];
    deleteBtn.click();

    const actualChildren = output.childElementCount;
    const expectedChildren = 1
    const actualFirstChildID = output.firstElementChild.id;
    const expectedFirstChildID = 'item-2'
    
    console.log("Number of elements")
    equal(actualChildren, expectedChildren);
    console.log("First Element id")
    equal(actualFirstChildID, expectedFirstChildID)

    numberOfItems = 0;
    output.innerHTML = '';
});

console.groupEnd();
// End of deleting items tests

// Filtering checked off items tests
console.group("Filter checked Tests");

test("checking an item moves it from output to filtered div", () => {
    
    //add input
    const input = document.querySelector("#toDoInput");
    input.value = "TEST ITEM 1";

    //access filtered section
    const filtered = document.querySelector("#filtered");
    
    //submit
    const submitButton = document.querySelector("#addSubmit");
    submitButton.click();

    //check input
    const checkButton = document.querySelector("#item-1 > input[type=checkbox]")
    checkButton.click();

    //count items in output and filtered
    const actualOutputChildren = output.childElementCount;
    const expectedOutputChildren = 0;

    const actualFilteredChildren = filtered.childElementCount;
    const expectedFilteredChildren = 1;

    //test
    equal(actualOutputChildren, expectedOutputChildren);
    equal(actualFilteredChildren, expectedFilteredChildren);
    
    //reset
    numberOfItems = 0;
    output.innerHTML = '';
    filtered.innerHTML = '';
    form.reset();
})

test("checking an item twice returns it from filtered div to output", () => {
    
    //add input
    const input = document.querySelector("#toDoInput");
    input.value = "TEST ITEM 1";

    //access filtered section
    const filtered = document.querySelector("#filtered");

    //submit
    const submitButton = document.querySelector("#addSubmit");
    submitButton.click();

    //check item twice
    const checkButton = document.querySelector("#item-1 > input[type=checkbox]")
    checkButton.click();
    checkButton.click();

    //count items in output and filtered
    const actualOutputChildren = output.childElementCount;
    const expectedOutputChildren = 1;
    const actualFilteredChildren = filtered.childElementCount;
    const expectedFilteredChildren = 0;

    //test
    equal(actualOutputChildren, expectedOutputChildren);
    equal(actualFilteredChildren, expectedFilteredChildren);

    //reset
    numberOfItems = 0;
    output.innerHTML = '';
    filtered.innerHTML = '';
    form.reset();
})

test("checking multiple items filters them and not others", () => {
    
    //add input
    const input = document.querySelector("#toDoInput");
    input.value = "TEST ITEM 1";

    //access filtered section
    const filtered = document.querySelector("#filtered");

    //submit item
    const submitButton = document.querySelector("#addSubmit");
    submitButton.click();

    //add and submit two more items
    input.value = "TEST ITEM 2";
    submitButton.click();

    input.value = "TEST ITEM 3";
    submitButton.click();

    //check 2 items
    const checkButton1 = document.querySelector("#item-1 > input[type=checkbox]");
    const checkButton2 = document.querySelector("#item-2 > input[type=checkbox]");
    checkButton1.click();
    checkButton2.click();

    //access IDs of items in output and filtered
    const actualFirstOutputChildID = output.firstElementChild.id;
    const expectedFirstOutputChildID = 'item-3'

    const actualFirstFilteredChildID = filtered.firstElementChild.id;
    const expectedFirstFilteredChildID = 'item-1'

    //count items in output and filtered
    const actualOutputChildren = output.childElementCount;
    const expectedOutputChildren = 1;
    const actualFilteredChildren = filtered.childElementCount;
    const expectedFilteredChildren = 2;

    //test
    equal(actualOutputChildren, expectedOutputChildren);
    equal(actualFilteredChildren, expectedFilteredChildren);
    equal(actualFirstOutputChildID, expectedFirstOutputChildID);
    equal(actualFirstFilteredChildID, expectedFirstFilteredChildID);
    
    //reset
    numberOfItems = 0;
    output.innerHTML = '';
    filtered.innerHTML = '';
    form.reset();
})

console.groupEnd();
// End of filtering checked off item tests