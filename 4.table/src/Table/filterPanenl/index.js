import temp from './view.html'
import { Component } from 'san'

export default class filterPannel extends Component {
    static template = temp
    attached() {
        console.log('pannel')
        const position = this.data.get('position'),
            filters = this.data.get('filters')
        console.log(filters)

    }
    cancel() {
        this.dispatch('filterPannelCancel')
        this.dispose()
    }
    confirm() {
        this.dispatch('filterBegin', this.data.get('filters'))
    }
    chose(i) {
        const f = this.data.get('filters.' + i),
            state = f.checked

        if (!state) {
            this.data.set('filters.' + i + '.checked', true)
        } else {
            this.data.set('filters.' + i + '.checked', false)
        }
    }
}