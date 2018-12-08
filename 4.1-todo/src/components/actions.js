import { store } from 'san-store/src/main'
import { builder } from 'san-update'
import service from './service'

store.addAction('fetchTodos', (selected, {getState, dispatch}) => {
    console.log("???")
    dispatch('updateSelected', selected);
    console.log(selected)
    return service.Todos().then(todos => {

        if(getState('selected') === selected){
            dispatch('fillTodos', todos)
        }
    })
})

store.addAction('updateSelected', selected => {
    return builder().set('selected', selected)
})


store.addAction('fillTodos', (todos, {getState}) => {
    let sel = false;

    switch(getState('selected')){
        case '':
            return builder().set('todos', todos);
        case 'active':
            break;
        case 'complete':
            sel = true;
            break
    }
    const todosFit = todos.filter(todo => 
        todo.done === sel)
    return builder().set('todos', todosFit);
})

store.addAction('addTodo', (rowTodo, {dispatch}) => {
    service.addTodo(rowTodo).then( todo => {
        dispatch('endAddTodo', todo)
    })
})

store.addAction('endAddTodo', (todo) => {
    return builder().unshift('todos', todo)
})


store.addAction('rmTodo', (todo, {getState}) => {
    service.rmTodo(todo);
    const index = getState('todos').findIndex(item => item.id === todo.id);
    return builder().removeAt('todos', index)
})

store.addAction('editTodo', (todo) => {
    service.editTodo(todo)
})

store.addAction('doneTodo', (todo, {dispatch}) => {
    console.log(todo)
    service.doneTodo(todo.list).then(item => {
        if(todo.isRM){

            dispatch('endDoneTodo', item)
        }
    })
})

store.addAction('endDoneTodo', (todo, {getState}) => {
    console.log(todo)
    const index = getState('todos').findIndex(item => item.id === todo.id);
    return builder().removeAt('todos', index)
})