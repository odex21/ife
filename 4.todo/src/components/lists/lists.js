import { Component } from 'san'
import san from 'san'
import { transition } from 'san-transition'
import listsTemp from './liststemp.html'

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

    static template = listsTemp

    static components = {
        's-input': input,
        's-li': list
    }
    /*     route() {
            console.log("Lists is routed")
            const route = this.data.get('route'),
                str = route.query.selected || '';
            console.log(route)
            this.data.set('isAll', (str ? false : true))
            console.log(this.data.get('isAll'))
            this.actions.lists(str)//更新todos
        } */
    attached() {
        /*         console.log("Lists is routed")
                const route = this.data.get('route'),
                    str = route.query.selected || '';
                console.log(route) */
        const state = history.state
        const str = state
        this.data.set('isAll', (str === '#' ? false : true))
        console.log(this.data.get('isAll'))
        this.actions.lists(str)//更新todos
        const that = this
        window.onpopstate = function (event) {
            console.log(event.state)
            that.actions.lists(event.state)
        }
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
        },
        isAll: function () {
            const sel = this.data.get('selected')
            console.log(sel + "_______________")
            return (sel !== '#' ? false : true)
        }
    }

    edit(i) {
        this.data.set("todos." + i + ".editing", true)
    }

    complete(l, i) {
        console.log(this.data.get('bArr'))
        this.data.set("bArr." + i, '')


        //set方法可能是异步的，导致done先触发，然后数据被锁定，无法操作
        const isAll = this.data.get('isAll')
        console.log(isAll)

        setTimeout(() => {
            this.actions.done({ list: l, isRM: !isAll })
        }, 0)
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

    rmTodo(list, i) {

        this.data.set("bArr." + i, '')
        setTimeout(() => {
            this.actions.rm(list);
        }, 0)
    }
}


