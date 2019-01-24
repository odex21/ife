import { Component } from 'san'
import temp from './view.html'

export default class td extends Component {
    static template = temp
    attached() {
        // console.log(this.data.get('item.address'))
    }
}

