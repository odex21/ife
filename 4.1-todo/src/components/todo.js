import { Component } from 'san'
import { Link } from 'san-router'

export default class Todo extends Component {
    constructor() {
        super(...arguments)
    }

    static template = `
    <div>
        <div class="header">
            <h1>Todos</h1>
            <input on-keyup="push($event)" value="{=newList=}">
        </div>
        <div class="box"><i>
            <router-link to='/'>all</router-link>
            </i>
            <i>
            <router-link to='/active'>active</router-link>
            </i>
            <i>
            <router-link to='/complete'>complete</router-link>
            </i>
        </div>
    </div>
    `

    attached(){
        console.log("todo Attached")
    }

    static components = {
        'router-link': Link,
    }

    push(e) {
        if (e.keyCode !== 13)
            return
        const title = this.data.get('newList');
        this.data.set('newList', '')

        this.actions.addTodo({title: title})
    }

}