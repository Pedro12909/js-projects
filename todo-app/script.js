const todoList = document.getElementById('todoList');
const inputBox = document.getElementById('addInput');

const LOCAL_STORAGE_KEY = 'todo_app_item_list';

// Get items from local storage
let items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

items.forEach(item => {
    todoList.appendChild(createListItemElement(item));
});

function checkItemHandler(btn, text) {
    btn.classList.toggle('checked');
    text.classList.toggle('striked');
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
    row.classList.add('row');

    // Holds check button and text
    const checkAndTextEl = document.createElement('div');

    // Check Icon
    const checkIcon = document.createElement('i');
    checkIcon.classList.add('fa', 'fa-check', 'fa-2x');

    // Delete Icon
    const delIcon = document.createElement('i');
    delIcon.classList.add('fa', 'fa-trash', 'fa-2x');
    
    // Check Button
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('checkBtn');
    checkBtn.type = 'button';
    checkBtn.appendChild(checkIcon);
    checkAndTextEl.appendChild(checkBtn);

    // Text
    const text = document.createElement('p');
    text.innerText = name;
    checkAndTextEl.appendChild(text);

    checkBtn.addEventListener('click', () => checkItemHandler(checkBtn, text));

    row.appendChild(checkAndTextEl);

    // Remove Button
    const delBtn = document.createElement('button');
    delBtn.classList.add('delBtn');
    delBtn.type = 'button';
    delBtn.addEventListener('click', evt => deleteItemHandler(evt, name));
    delBtn.appendChild(delIcon);
    row.appendChild(delBtn);

    li.appendChild(row);
    return li;
}

inputBox.addEventListener('keydown', e => addItemHandler(e))

