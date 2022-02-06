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

module.exports = { ToDoController }