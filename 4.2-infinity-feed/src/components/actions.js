import { store } from 'san-store'
import { builder } from 'san-update'
import service from './service'

store.addAction('fetchData', (payload, {dispatch}) => {
    dispatch('updateTotal', 60)
    console.log("fetchting")
    return builder().set('data', service.getData(0))
})

store.addAction('addData', (payload, {getState, dispatch}) => {
    const total = getState('total')
    console.log(total)
    dispatch('updateTotal', total + 60)
    console.log(total)

    return builder().splice('data', total, ...service.getData(total))
})

store.addAction('updateTotal', (num) => {
    return builder().set('total', num)
})