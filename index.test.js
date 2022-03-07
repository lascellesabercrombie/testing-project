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

console.groupEnd();
// End of filtering checked off item tests