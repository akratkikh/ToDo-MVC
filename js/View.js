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

module.exports = { ToDoVIew }