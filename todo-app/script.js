const todoList = document.getElementById('todoList');
const inputBox = document.getElementById('addInput');

function deleteItemHandler(event) {
    const btn = event.target;

    const li = btn.parentNode.parentNode;
    const ul = li.parentNode;

    ul.removeChild(li);
}

function createListItemElement(name) {
    const li = document.createElement('li');
     
    const row = document.createElement('div');
    row.classList.add('container');

    // Check Button
    const checkBtn = document.createElement('button');
    checkBtn.type = 'button';
    checkBtn.textContent = 'Check';
    checkBtn.classList.add('checkBtn');
    row.appendChild(checkBtn);

    // Text
    const text = document.createElement('p');
    text.innerText = name;
    text.classList.add('todoText');
    row.appendChild(text);

    // Remove Button
    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.textContent = 'Delete';
    delBtn.classList.add('delBtn');
    delBtn.addEventListener('click', evt => deleteItemHandler(evt))
    row.appendChild(delBtn);

    li.appendChild(row);
    return li;
}

function addTodoEventHandler(event) {
    if (event.keyCode == 13) {
        const inputBoxValue = inputBox.value.trim();

        if (inputBoxValue === '') return;

        // Append todoElement
        todoList.appendChild(createListItemElement(inputBoxValue));

        // Reset input box value
        inputBox.value = '';
    }
}

inputBox.addEventListener('keydown', e => addTodoEventHandler(e))

