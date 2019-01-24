import { store } from 'san-store'
import { builder } from 'san-update'
import service from './service'

store.addAction('getTodos', (payload, { dispatch }) => {
    service.getTodos().then(() => {
        dispatch('fetchTodos', payload)
    })
})

store.addAction('fetchTodos', (selected, { getState, dispatch }) => {
    console.log("??/")
    dispatch('updateSelected', selected);
    return service.Todos().then(todos => {
        const sel = getState('selected')
        if (sel === selected) {
            dispatch('checkDone')
            dispatch('fillTodos', todos)
        }
    })
})


store.addAction('updateSelected', selected => {
    return builder().set('selected', selected)
})


store.addAction('fillTodos', (todos, { getState, dispatch }) => {
    let sel = false
    const state = getState('selected')
    switch (state) {
        case null:
        case '':
            return builder().set('todos', todos);
        case 'active':
            break;
        case 'complete':
            sel = true;
            break
    }
    const todosFit = todos.filter(todo => {
        if (todo.done === sel) {
            return todo
        }
    })


    return builder().set('todos', todosFit);
})


store.addAction('addTodo', (rowTodo, { dispatch }) => {
    service.addTodo(rowTodo).then(todo => {
        dispatch('endAddTodo', todo)
        dispatch('checkDone')
        setTimeout(() => {
            dispatch('updateTodos')
        }, 1000)
    })
})

store.addAction('endAddTodo', (todo) => {
    return builder().unshift('todos', todo)
})


store.addAction('rmTodo', (todo, { getState, dispatch }) => {
    service.rmTodo(todo).then(() => {
        const index = getState('todos').findIndex(item => item.id === todo.id);
        console.log(index)
        dispatch('removeTodo', index)
        dispatch('checkDone')
        setTimeout(() => {
            dispatch('updateTodos')
        }, 1000)
    })
})

store.addAction('rmTodo_all', (todo, { getState, dispatch }) => {
    service.rmTodo(todo).then(() => {
        const index = getState('todos').findIndex(item => item.id === todo.id);
        console.log(index)
        dispatch('removeTodo', index)
        dispatch('checkDone')

    })
})

store.addAction('removeTodo', (index) => {
    return builder().removeAt('todos', index)
})

store.addAction('editTodo', (todo, { dispatch }) => {
    service.editTodo(todo)
    setTimeout(() => {
        dispatch('updateTodos')
    }, 1000)
})

store.addAction('doneTodo', (todo, { getState, dispatch }) => {
    console.log(todo)

    service.doneTodo(todo.list).then(item => {
        if (todo.isRM) {

            dispatch('endDoneTodo', item)
        }
        dispatch('checkDone')
        setTimeout(() => {
            dispatch('updateTodos')
        }, 1000)
    })
})

store.addAction('endDoneTodo', (todo, { getState }) => {
    console.log(todo)
    const index = getState('todos').findIndex(item => item.id === todo.id);
    return builder().removeAt('todos', index)
})

//更新未完成的数量
store.addAction('checkDone', (payload, { dispatch }) => {
    console.log("checking Done!")
    service.Todos().then(todos => {
        let todosFit = Array.prototype.filter.call(todos, (todo => todo.done === false))
        dispatch('updateUnDone', todosFit.length)
        dispatch('updateDone', todos.length - todosFit.length)
    })
})

store.addAction('updateDone', (num) => {
    return builder().set('doneNum', num)
})

store.addAction('updateUnDone', (num) => {
    return builder().set('unDoneNum', num)
})

//清楚完成的todos
store.addAction('clearDones', (payload, { getState, dispatch }) => {
    service.Todos().then(todos => {

        for (let i = 0; i < todos.length; i++) {
            if (todos[i].done) {
                dispatch('rmTodo_all', todos[i])
            }
        }
    })
    //加一个promise.all才行
    setTimeout(() => {
        dispatch('updateTodos')
    }, 2000)
})


store.addAction('updateTodos', (payload, { dispatch }) => {
    dispatch('doneUpdateTodos')
})

store.addAction('doneUpdateTodos', (payload) => {
    service.Todos().then(todos => {
        service.update(todos)
    })
})
