import Lists from './components/lists/lists'
import Todo from './components/todo'
import Control from './components/control/control'
import './components/css'
import './components/actions'
import { connect } from 'san-store'
//import { Router } from 'san-router'
import testApi from './components/testApi'

new testApi().attach(document.body)

connect.san(
    { todos: 'todos', selected: 'selected' },
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

connect.san(
    { unDoneNum: 'unDoneNum', doneNum: 'doneNum' },
    {
        clear: 'clearDones',
        lists: 'fetchTodos'
    })(Control)


new Todo().attach(document.body.children["todoapp"].children["input"])
new Control().attach(document.body.children["todoapp"].children['controlBox'])
new Lists().attach(document.body.children["todoapp"].children['todoLists'])


/* let router = new Router;

const routes = [
    {
        rule: '/'
    },
    {
        rule: '/:selected',
    },
]

routes.forEach(item => {
    router.add({
        ...item,
        Component: Lists,
        target: '#todoLists',

    })
})
//router.setMode('html5')
router.start() */