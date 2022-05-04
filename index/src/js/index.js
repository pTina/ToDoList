import { ToDoList } from './todolist.js';

$(document).ready(()=>{
    const todolist = new ToDoList($('#wrap'));
    todolist.init();
})