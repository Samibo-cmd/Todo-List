

localStorage.getItem('todoList');
let todoList = JSON.parse(localStorage.getItem('todoList'));

if (!todoList) {
  todoList = [];
}
//console.log(todoList);

renderList();

function renderList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    //const name = todoObject.name;
    //const dueDate = todoObject.dueDate;
    const { name, dueDate } = todoObject;

    const html = `
                  <div>${name}</div>
                  <div>${dueDate}</div>
                  <button class="js-delete-button">Delete</button>
                `
    todoListHTML += html;
  }

  document.querySelector('.todoList-display').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-button')
  .forEach((delleteButton, index) => {
    delleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderList();
      updateLocalStorage();
    })
  })
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dueDateElement = document.querySelector('.date-input');
  const dueDate = dueDateElement.value;

  if (inputElement.value === '') {
    return;
  }

  todoList.push({
    //name: name,
    //dueDate: dueDate
    name,
    dueDate
  });
  
  updateLocalStorage();

  inputElement.value = '';
  dueDateElement.value = '';

  renderList();
}

function updateLocalStorage() {
  let stringified = JSON.stringify(todoList);
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

const inputElement = document.querySelector('.js-name-input');
const name = inputElement.value;

function activate(event) {
  if (inputElement.value === '') {
    return;
  }
  else if (event.key === 'Enter') {
    addTodo();
    renderList();
  }
}



//Question: How delete a value of an array in localStorage?