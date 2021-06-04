let todoContainer = document.querySelector('.todo-list');
let todoButton = document.querySelector('.todo-btn');
let inputName = document.querySelector('.input-name');
let todoFilter = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', btnsubmit);
todoContainer.addEventListener('click', deletecheck);
todoFilter.addEventListener('click', filter);

function btnsubmit(event) {
	//prevent browser reload
	event.preventDefault();

	if (inputName.value.trim() === '') {
		alert('Enter Todos to add in');
	} else {
		//creatinng div
		let todoDiv = document.createElement('div');
		todoDiv.classList.add('todo-div');
		// todoDiv.contentEditable = true;

		//creatinng li
		let todoList = document.createElement('li');
		todoList.classList.add('todo-list');
		todoList.innerText = inputName.value;

		saveLocal(inputName.value);
		todoDiv.appendChild(todoList);

		//creatinng button
		let todoChecked = document.createElement('button');
		todoChecked.classList.add('todo-check');
		todoChecked.innerHTML = '<i class="fas fa-check"></i>';
		todoDiv.appendChild(todoChecked);

		//creatinng buttn delete
		let todoDele = document.createElement('button');
		todoDele.classList.add('todo-dele');
		//adding innerhtml syle to it
		todoDele.innerHTML = '<i class="fas fa-trash"></i>';
		todoDiv.appendChild(todoDele);

		//appending the child to main div
		todoContainer.appendChild(todoDiv);
		inputName.value = '';
	}
}

function deletecheck(event) {
	// console.log(event.target);
	let item = event.target;
	if (item.classList[0] === 'todo-dele') {
		let todo = item.parentElement;
		todo.classList.add('fall');
		removeTodo(todo);
		todo.addEventListener('transitionend', function () {
			todo.remove();
		});
	}

	if (item.classList[0] === 'todo-check') {
		let todo = item.parentElement;
		todo.classList.toggle('completed');
	}
}

function filter(event) {
	const todos = todoContainer.childNodes;
	todos.forEach(function (todo) {
		switch (event.target.value) {
			case 'all':
				todo.style.display = 'flex';
				break;
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}

function saveLocal(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function (todo) {
		console.log('hello');
		// todo.preventDefault();

		//creatinng div
		let todoDiv = document.createElement('div');
		todoDiv.classList.add('todo-div');
		// todoDiv.contentEditable = true;

		//creatinng li
		let todoList = document.createElement('li');
		todoList.classList.add('todo-list');
		todoList.innerText = todo;

		todoDiv.appendChild(todoList);

		//creatinng button
		let todoChecked = document.createElement('button');
		todoChecked.classList.add('todo-check');
		todoChecked.innerHTML = '<i class="fas fa-check"></i>';
		todoDiv.appendChild(todoChecked);

		//creatinng buttn delete
		let todoDele = document.createElement('button');
		todoDele.classList.add('todo-dele');
		//adding innerhtml syle to it
		todoDele.innerHTML = '<i class="fas fa-trash"></i>';
		todoDiv.appendChild(todoDele);

		//appending the child to main div
		todoContainer.appendChild(todoDiv);
	});
}

function removeTodo(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem('todos', JSON.stringify(todos));
	console.log(todoIndex);
}
