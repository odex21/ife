import { store } from 'san-store'
import { builder } from 'san-update'
import service from './service'

store.addAction('fetchTodos', (selected, { getState, dispatch }) => {
    dispatch('updateSelected', selected);
    return service.Todos().then(todos => {

        if (getState('selected') === selected) {
            dispatch('checkDone')
            dispatch('fillTodos', todos)
        }
    })
})


store.addAction('updateSelected', selected => {
    return builder().set('selected', selected)
})


store.addAction('fillTodos', (todos, { getState, dispatch }) => {
    let sel = false, unDone = 0;

    switch (getState('selected')) {
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
    })
})

store.addAction('endAddTodo', (todo) => {
    return builder().unshift('todos', todo)
})


store.addAction('rmTodo', (todo, { getState }) => {
    service.rmTodo(todo);
    const index = getState('todos').findIndex(item => item.id === todo.id);
    return builder().removeAt('todos', index)
})

store.addAction('editTodo', (todo) => {
    service.editTodo(todo)
})

store.addAction('doneTodo', (todo, { getState, dispatch }) => {
    console.log(todo)
    
    service.doneTodo(todo.list).then(item => {
        if (todo.isRM) {
            
            dispatch('endDoneTodo', item)
        }
        dispatch('checkDone')
    })
})

store.addAction('endDoneTodo', (todo, { getState }) => {
    console.log(todo)
    const index = getState('todos').findIndex(item => item.id === todo.id);
    return builder().removeAt('todos', index)
})

//更新未完成的数量
store.addAction('checkDone', (payload , {dispatch}) => {
    console.log("checking!")
    service.Todos().then(todos => {
            let todosFit = todos.filter(todo => todo.done === false)
            console.log(todosFit)
            console.log(todos)
            dispatch('updateUnDone', todosFit.length)
        })
})

store.addAction('updateUnDone', (num) => {
    return builder().set('unDoneNum', num)
})

store.addAction('clearDones', (payload, {getState, dispatch}) => {
    service.Todos().then(todos => {

        for(let i = 0; i < todos.length; i++){
            if(todos[i].done){
                dispatch('rmTodo', todos[i])
            }
        }
    })
})