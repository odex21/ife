import Lists from './components/lists'
import Todo from './components/todo'
import './components/css.styl'
import './components/actions'
import { connect } from 'san-store/src/main'

connect.san(
    {todos: 'todos', selected: 'selected'},
    {
        lists: 'fetchTodos',
        edit: 'editTodo',
        selected: 'updateSelected',
        rm: 'rmTodo',
        done: 'doneTodo'
    }
)(Lists)

connect.san({},
    {
        addTodo: 'addTodo',
    }
)(Todo)

console.log("app")
new Todo().attach(document.body.children["input"])


import { Router }  from 'san-router'


let router = new Router;

const routes = [
    {
        rule: '/',
    },
    {
        rule: '/active',
    },
    {
        rule: '/complete',
    }
]

routes.forEach( item => {
    router.add({
        ...item,
        Component:Lists,
        target: '#todoLists',

    })
})
//router.setMode('html5')
router.start()