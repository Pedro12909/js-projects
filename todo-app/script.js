const todoList = document.getElementById('todoList');
const inputBox = document.getElementById('addInput');

const LOCAL_STORAGE_KEY = 'todo_app_item_list';

// Get items from local storage
let items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

items.forEach(item => {
    if (item.text) {
        const liElement = createListItemElement(item.text);

        if (item.checked === true) {
            toggleRowChecked(liElement);
        }

        todoList.appendChild(liElement);
    }
});

function hasDuplicate(name) {
    const duplicate = false;

    items.forEach(item => {
        if (item.text === name) {
            duplicate = true;
        }
    })

    return duplicate;
}

function toggleRowChecked(liElement) {
    const checkBtn = liElement.querySelector('.checkBtn');
    const textEl = liElement.querySelector('.checkBtn + p');

    checkBtn.classList.toggle('checked');
    textEl.classList.toggle('striked');
}

function checkItemHandler(li) {
    const value = li.querySelector('.checkBtn + p').textContent;

    items.forEach(item => {
        if (item.text === value) {
            item.checked = !item.checked
        }
    });

    toggleRowChecked(li);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

function addItemHandler(event) {
    if (event.keyCode == 13) {
        const inputBoxValue = inputBox.value.trim();

        if (inputBoxValue === '') return;

        if (hasDuplicate(inputBoxValue)) return;

        // Append todoElement
        todoList.appendChild(createListItemElement(inputBoxValue));
        
        // Persist in local storage
        items.push({text: inputBoxValue, checked: false});
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
    items = items.filter(item => item.text !== name)
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

    row.appendChild(checkAndTextEl);

    // Remove Button
    const delBtn = document.createElement('button');
    delBtn.classList.add('delBtn');
    delBtn.type = 'button';
    delBtn.addEventListener('click', evt => deleteItemHandler(evt, name));
    delBtn.appendChild(delIcon);
    row.appendChild(delBtn);

    li.appendChild(row);

    checkBtn.addEventListener('click', () => checkItemHandler(li));
    return li;
}

inputBox.addEventListener('keydown', e => addItemHandler(e))

