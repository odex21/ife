import { Component } from 'san'

export default class Todo extends Component {
    constructor() {
        super(...arguments)
    }

    static template = `
    <div class="header">
        <h1>todos</h1>
        <input on-keyup="push($event)" value="{=newList=}" placeholder="What needs to be done?" class="new-todo">
    </div>
    `

    attached() {
        console.log("todo Attached")
    }



    push(e) {
        if (e.keyCode !== 13)
            return
        const title = this.data.get('newList');
        if (title != '' && title != undefined) {
            this.data.set('newList', '')
            this.actions.addTodo({ title: title })
        }
    }

}