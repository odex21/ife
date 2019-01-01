import { Component } from 'san'
import { Link } from 'san-router'

export default class contorlBox extends Component {
    constructor() {
        super(...arguments)
    }

    static template = `
    <footer class="footer">
        <span class="todo-count"><strong>{{unDoneNum}}</strong>件未完成</span>
        <ul class="box">
            <li>
            <router-link to='/'>all</router-link>
            </li>
            <li>
            <router-link to='/active'>active</router-link>
            </li>
            <li>
            <router-link to='/complete'>complete</router-link>
            </li>
        </ul>
        <button class="clear-completed" on-click="clearDone">清除已完成</button>
    </footer>`

    static components = {
        'router-link': Link,
    }
    initData() {
        return {
            unDoneNum: 0
        }
    }

    clearDone() {
        console.log("???")
        this.actions.clear()
    }
}