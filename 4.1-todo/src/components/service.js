import { resolve } from "path";

const clone = (source) => {
    //只克隆自身的值，不克隆继承的值
    return Object.assign({}, source)
}


export default {
    addTodo(todo){
        return this.Todos().then(todos => {
            let id = 1;

            if(todos[0]){
                id = todos[0].id + 1;
            }
            let _todo = { 
                title: todo.title, 
                done: false, 
                id: id};
            todos.unshift(_todo)
            this.Save(todos)
            return _todo
        })

    },

    editTodo(todo_){//可能要修改，没做disaptch方法
        const todo = clone(todo_);
        this.Todos().then(todos => {
            let index = todos.findIndex(item =>item.id === todo.id);
            todos[index] = todo
            this.Save(todos)
        })
    },

    Todos(){
        const todos = JSON.parse(window.localStorage.getItem('todos') || '[]');
        return new Promise(resolve => {
            resolve(todos)
        })
    },

    Save(todos){
        window.localStorage.setItem("todos", JSON.stringify(todos))
    },

    rmTodo(todo){
        return this.Todos().then(todos => {
            const index = todos.findIndex(item => item.id === todo.id);
            todos.splice(index, 1);
            this.Save(todos)
        })
    },

    doneTodo(todo){
        return this.Todos().then(todos => {
            const index = todos.findIndex(item => item.id === todo.id);

            //突然发现，其实没必要克隆，每次拿到的都是新数组

            todos[index].done = !todos[index].done;
            this.Save(todos)
            return todos[index];
        })
    }


}