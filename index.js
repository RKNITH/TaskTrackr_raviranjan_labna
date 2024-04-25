const inputBox = document.getElementById('txt');
const addBtn = document.getElementById('btn');
const todoList = document.getElementById('todoList');

let editTodo = null;

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your Todo");
        return;
    }
    if (addBtn.value === 'Edit') {
        const oldText = editTodo.querySelector('p').innerHTML;
        const newText = inputText;
        editTodo.querySelector('p').innerHTML = newText;
        editLocalTodos(oldText, newText);

        addBtn.value = 'Add';
        inputBox.value = '';
        editTodo = null;
    } else {
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = inputText;
        li.append(p);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Remove';
        deleteBtn.classList.add('delBtn', 'del');
        li.appendChild(deleteBtn);

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('delBtn', 'edit');
        li.appendChild(editBtn);
        todoList.appendChild(li);
        inputBox.value = '';
        saveLocalTodo(inputText);
    }
}

const updateTodo = (e) => {
    if (e.target.innerHTML === 'Remove') {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement.querySelector('p').innerHTML);
    }
    if (e.target.innerHTML === 'Edit') {
        inputBox.value = e.target.parentElement.querySelector('p').innerHTML;
        inputBox.focus();
        addBtn.value = 'Edit';
        editTodo = e.target.parentElement;
    }
}

const saveLocalTodo = (todo) => {
    let todos = [];
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        todos.forEach(todo => {
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.innerHTML = todo;
            li.append(p);

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Remove';
            deleteBtn.classList.add('delBtn', 'del');
            li.appendChild(deleteBtn);

            const editBtn = document.createElement('button');
            editBtn.innerText = 'Edit';
            editBtn.classList.add('delBtn', 'edit');
            li.appendChild(editBtn);
            todoList.appendChild(li);
        });
    }
}

const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todos.indexOf(todo);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

const editLocalTodos = (oldTodo, newTodo) => {
    let todos = JSON.parse(localStorage.getItem('todos'));
    let todoIndex = todos.indexOf(oldTodo);
    if (todoIndex !== -1) {
        todos[todoIndex] = newTodo;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}




document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
