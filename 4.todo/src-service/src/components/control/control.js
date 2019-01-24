import { Component } from 'san'
// import { Link } from 'san-router'
import input from './control.html'

export default class contorlBox extends Component {
    constructor() {
        super(...arguments)
    }

    static template = input

    // static components = {
    //     'router-link': Link,
    // }

    initData() {
        return {
            unDoneNum: 0,
        }
    }

    clearDone() {
        this.actions.clear()
    }

    to(tag) {
        history.pushState(tag, `${tag}`, `?${tag}`)
        this.actions.lists(tag)
    }
}