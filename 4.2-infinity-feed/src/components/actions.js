import { store } from 'san-store'
import { builder } from 'san-update'
import service from './service'

store.addAction('fetchData', (payload, {dispatch}) => {
    dispatch('updateTotal', 20)
    console.log("fetchting")
    return builder().set('data', service.getData(0))
})

store.addAction('addData', (payload, {getState, dispatch}) => {
    const total = getState('total')
    dispatch('updateTotal', total + 20)
    return builder().splice('data', total, ...service.getData(total - 20))
})

store.addAction('updateTotal', (num) => {
    return builder().set('total', num)
})