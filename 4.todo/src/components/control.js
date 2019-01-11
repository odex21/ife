import { Component } from 'san'
import { Link } from 'san-router'
import input from './control.html'

export default class contorlBox extends Component {
    constructor() {
        super(...arguments)
    }

    static template = input

    static components = {
        'router-link': Link,
    }
    attached() {
    }
    initData() {
        return {
            unDoneNum: 0,
        }
    }

    clearDone() {
        console.log("???")
        this.actions.clear()
    }
}