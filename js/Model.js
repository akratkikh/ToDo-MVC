function ToDoModel(todos) {
    this.toDos = todos || JSON.parse(localStorage.getItem('tasks')) || [];
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

module.exports = { ToDoModel }