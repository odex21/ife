import Lists from './components/lists'
import Todo from './components/todo'
import Control from './components/control'
import './components/css'
import './components/actions'
import { connect } from 'san-store'
import { Router } from 'san-router'
import './main'
import { Input } from 'element-ui';

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
    { unDoneNum: 'unDoneNum' },
    {
        clear: 'clearDones'
    })(Control)


new Todo().attach(document.body.children["todoapp"].children["input"])
new Control().attach(document.body.children["todoapp"].children['controlBox'])


let router = new Router;

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
router.start()