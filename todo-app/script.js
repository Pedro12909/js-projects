const todoList = document.getElementById('todoList');
const inputBox = document.getElementById('addInput');

const LOCAL_STORAGE_KEY = 'todo_app_item_list';

// Get items from local storage
let items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

items.forEach(item => {
    todoList.appendChild(createListItemElement(item));
});

function checkItemHandler(li) {
    li.classList.toggle('checked')
}

function addItemHandler(event) {
    if (event.keyCode == 13) {
        const inputBoxValue = inputBox.value.trim();

        if (inputBoxValue === '') return;

        // Append todoElement
        todoList.appendChild(createListItemElement(inputBoxValue));
        
        // Persist in local storage
        items.push(inputBoxValue);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));

        // Reset input box value
        inputBox.value = '';
    }
}

function deleteItemHandler(event, name) {
    const btn = event.target;

    const li = btn.parentNode.parentNode;
    const ul = li.parentNode;

    // Persist in local storage
    items = items.filter(item => item !== name)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));

    ul.removeChild(li);
}

function createListItemElement(name) {
    const li = document.createElement('li');
     
    const row = document.createElement('div');

    // Check Button
    const checkBtn = document.createElement('button');
    checkBtn.type = 'button';
    checkBtn.textContent = 'Check';
    checkBtn.addEventListener('click', () => checkItemHandler(li));
    row.appendChild(checkBtn);

    // Text
    const text = document.createElement('p');
    text.innerText = name;
    row.appendChild(text);

    // Remove Button
    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', evt => deleteItemHandler(evt, name));
    row.appendChild(delBtn);

    li.appendChild(row);
    return li;
}

inputBox.addEventListener('keydown', e => addItemHandler(e))

