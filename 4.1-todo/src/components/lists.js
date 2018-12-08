import { Component } from 'san'
import {transition} from 'san-transition'
import { install } from 'element-ui';


export default class List extends Component {

    static template = `
    <div class="todo-lists">
        <div class="list" s-for="list, index in todos" s-transition="transition('slide', 100)">
            <input type="checkbox" checked="{=list.done=}" on-click="complete(list)">
            <input value="{=list.title=}" on-keyup="change($event, list, index)">
            <i class="delete" on-click="rmTodo(list)">x</i>
        </div>
    </div>
    `

    attached(){
        console.log('attached')
    }

    route() {
        console.log("Lists is routed")
        const route = this.data.get('route'),
            str = route.path.slice(1);
        console.log(route)
        console.log(str)
        this.data.set('isAll', (str ? false: true))
        console.log(this.data.get('isAll'))
        this.actions.lists(str)//更新todos
    }
    initData(){
        return{
        }
    }

    complete(l){
        this.actions.done({list: l , isRM: !this.data.get('isAll')})
    }
    
    change(e, l, i){
        if(e.keyCode !== 13) return
        //第一个子node是text, " "
        const nodes = this.el.childNodes[i+1];
        nodes.querySelectorAll('input')[1].blur()
        this.actions.edit(l)
    }

    transition(){
        return transition(...arguments)
    }

    rmTodo(l){

        this.actions.rm(l);
    }
}


