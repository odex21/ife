import { Component } from 'san'
import san from 'san'
import { transition } from 'san-transition'

let input = san.defineComponent({
    template: `
    <div>
        <input class="edit" value="{= title =}" type="text" on-blur="blur" on-keyup="edit($event)">
    </div>
    `,
    attached: function () {
        this.el.children[0].focus()
    },
    blur: function () {
        this.fire('blur')
    },
    edit: function (e) {
        if (e.keyCode == 13) {
            if (this.data.get('title') !== '') {
                this.fire('change')
            }
        } else if (e.keyCode == 27) {
            this.fire('blur')
        }
    }
})

class list extends Component {
    static template = `        
    <li class="li" >
    <slot />
    </li>`

    transition() {
        return transition(...arguments)
    }
}

export default class List extends Component {

    static template = `
    <ul class="todo-lists" s-transition="transition('remove', 0)">
        <li class="list {{list.done? 'complete': ''}}" s-for="list, index in todos" s-transition="transition('slide', 0)">
            <div class="view" s-if="{{!list.editing}}">
            <input type="checkbox" checked="{=list.done=}" on-click="complete(list, index)">
            <label on-dblclick="edit(index)" >{{list.title}}</label>
            <button class="delete"  on-click="rmTodo(list)">{{bArr[index]}}</button>
            </div>
            <s-input title="{= list.title =}"   s-if="{{list.editing}}" 
                on-change="change(index)" on-blur="cancel(index, list)"><s-input>
        </li>
    </ul>
    `
    static components = {
        's-input': input,
        's-li': list
    }
    route() {
        console.log("Lists is routed")
        const route = this.data.get('route'),
            str = route.query.selected || '';
        console.log(route)
        this.data.set('isAll', (str ? false : true))
        console.log(this.data.get('isAll'))
        this.actions.lists(str)//更新todos
    }

    static computed = {
        bArr: function () {
            const obj = this.data.get('todos')
            if (!obj) { return }
            const l = obj.length
            const arr = []
            for (let i = 0; i < l; i++) {
                arr[i] = "x"
            }
            return arr
        }
    }

    edit(i) {
        this.data.set("todos." + i + ".editing", true)
    }

    complete(l, i) {
        console.log(
            this.data.get('bArr')
        )
        this.data.set("bArr." + i, '')
        console.log(
            this.data.get('bArr')
        )
        //set方法可能是异步的，导致done先触发，然后数据被锁定，无法操作
        setTimeout(() => {
            this.actions.done({ list: l, isRM: !this.data.get('isAll') })
        }, 10)
    }

    change(i) {
        //晚点加一个esc退出编辑的功能

        this.data.set("todos." + i + ".editing", false)

        this.actions.edit(this.data.get("todos." + i))

    }

    cancel(i, l) {
        this.data.set("todos." + i + ".editing", false)
        this.actions.edit(this.data.get("todos." + i))

    }

    transition() {
        return transition(...arguments)
    }

    rmTodo(list) {
        this.actions.rm(list);
    }
}


