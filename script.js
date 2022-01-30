function ToDoModel() {
    this.toDos = JSON.parse(localStorage.getItem('tasks')) || [];
    this.updateToDo = (arrayTasks) => localStorage.setItem('tasks', JSON.stringify(arrayTasks));

    this.clearToDo = () => {
        localStorage.removeItem('tasks');
        this.toDos = [];
    }

    this.addToDo = (value) => {
        const task = {
            id: this.toDos.length > 0 ? this.toDos[this.toDos.length - 1].id + 1 : 1,
            text: value,
            checked: false,
        }
        this.toDos.push(task);
        this.updateToDo(this.toDos);
    }

    this.doneTask = (id) => {
        const doneTask = this.toDos.find(item => item.id == id);
        doneTask.checked = !doneTask.checked;
        this.updateToDo(this.toDos);
    }

    this.deleteTask = (id) => {
        const newArray = this.toDos.filter(item => item.id != id);
        this.updateToDo(newArray);
        this.toDos = newArray;
    }

    this.editTask = (id, text) => {
        const changeTask = this.toDos.find(item => item.id == id);
        changeTask.text = text;
        this.updateToDo(this.toDos);
    }
}

function ToDoVIew() {
    this.addTaskInput = document.querySelector("#addTaskInput");
    this.addTaskButton = document.querySelector("#addTaskButton");
    this.clearTasksButton = document.querySelector("#clearTasksButton");
    this.todoBody = document.querySelector("#todoBody");

    this.takeInputText = () => this.addTaskInput.value;
    this.resetInputText = () => this.addTaskInput.value = '';

    this.createElement = (tag, className) => {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element
    }

    this.displayTodos = (todos) => {
        while (this.todoBody.firstChild) {
            this.todoBody.removeChild(this.todoBody.firstChild)
        }

        if (todos.length !== 0) {
            todos.forEach(task => {
                const taskDiv = this.createElement('div', 'todoItem');
                taskDiv.id = task.id;
                const checkbox = this.createElement('input', 'itemChecked');
                checkbox.type = 'checkbox';
                const p = this.createElement('p', 'itemText');
                p.innerHTML = task.text;
                const closeDiv = this.createElement('div', 'close');

                if (task.checked) {
                    p.classList.add('done')
                    checkbox.checked = true;
                }

                taskDiv.append(checkbox, p, closeDiv);
                this.todoBody.append(taskDiv);
            });
        }
    }

    this.openEditTask = (element) => {
        const input = this.createElement('input', 'changeInput');
        input.value = element.innerHTML;
        const saveChanged = this.createElement('div', 'saveChanges');
        saveChanged.innerHTML = "&#10004";
        const dontSaveChanged = this.createElement('div', 'dontSaveChanges');
        dontSaveChanged.innerHTML = "&#10006";
        element.replaceWith(input);
        input.after(saveChanged, dontSaveChanged);
    }

    this.saveChanges = (element) => {
        const input = element.querySelector('.changeInput');
        if (input.value.trim() !== '') return input.value;
    }
}

function ToDoController(model, view) {
    this.model = model;
    this.view = view;

    this.render = () => {
        this.view.displayTodos(this.model.toDos);
        this.view.resetInputText();
    }
    this.render();

    this.view.addTaskButton.onclick = () => {
        if (this.view.takeInputText() !== '') this.model.addToDo(this.view.takeInputText());
        this.render();
    }

    this.view.clearTasksButton.onclick = () => {
        this.model.clearToDo();
        this.render();
    }

    this.view.todoBody.onclick = (e) => {
        if (e.target.className === 'itemChecked') {
            this.model.doneTask(e.target.parentNode.id);
            this.render();
        }
        if (e.target.className === 'close') {
            this.model.deleteTask(e.target.parentNode.id);
            this.render();
        }
        if (e.target.className === 'saveChanges') {
            const newValue = this.view.saveChanges(e.target.parentNode);
            if (newValue) {
                this.model.editTask(e.target.parentNode.id, newValue);
                this.render();
            }
        }
        if (e.target.className === 'dontSaveChanges') {
            this.render();
        }
    }

    this.view.todoBody.ondblclick = (e) => {
        if (e.target.className.includes('itemText')) {
            this.view.openEditTask(e.target);
        }
    }
}

const app = new ToDoController(new ToDoModel(), new ToDoVIew());