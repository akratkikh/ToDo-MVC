/**
 * @jest-environment jsdom
 */
const { ToDoModel } = require('./js/Model.js');
const { ToDoController } = require('./js/Controller.js');
const { ToDoVIew } = require('./js/View.js');

const fs = require('fs');
const path = require('path');

const array = [
    {
        id: 1,
        text: 'text1',
        checked: false,
    },
    {
        id: 2,
        text: 'text2',
        checked: true,
    },
    {
        id: 3,
        text: 'text3',
        checked: false,
    },
    {
        id: 4,
        text: 'text4',
        checked: false,
    },
    {
        id: 5,
        text: 'text5',
        checked: false,
    },
];

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe('testing ToDo without array', function () {

    let container, app;
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = new ToDoController(new ToDoModel(), new ToDoVIew());
        container = document.querySelector('#todoBody');
    });

    test('test creating tasks', () => {
        const randNum = Math.floor(Math.random() * 10);
        for (let i = 0; i < randNum; i++) {
            app.model.addToDo(i);
        }
        app.render();
        expect(Array.from(container.childNodes).length).toBe(randNum);
    });
});


describe('testing ToDo with array', function () {

    let container, app;
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = new ToDoController(new ToDoModel(array), new ToDoVIew());
        container = document.querySelector('#todoBody');
    });

    test('test delete all tasks', () => {
        app.render();
        app.model.clearToDo();
        app.render();
        expect(Array.from(container.childNodes).length).toBe(0);
    });

    test('test creating task text', () => {
        app.render();
        expect(container.childNodes[array.length - 1].getElementsByTagName('p')[0].innerHTML).toBe(array[array.length - 1].text);
    });

    test('test delete task', () => {
        const randNum = Math.floor(Math.random() * 5) + 1;
        app.render();
        app.model.deleteTask(randNum);
        expect(app.model.toDos).toEqual(array.filter(item => item.id != randNum));
    });

    test('test change task', () => {
        const randNum = Math.floor(Math.random() * 5) + 1;
        const newText = 'text2281337';
        app.render();
        app.model.editTask(randNum, newText);
        expect(app.model.toDos.find(task => task.id === randNum).text).toBe(newText);
    });
});