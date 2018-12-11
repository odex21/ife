import { Component } from 'san'
import service from './service';

class Content extends Component {
    constructor() {
        super(...arguments)
    }

    static template = `
    <div>
        <slot 
            s-for="item in data" 
            s-bind="{title: item.title, date: item.date, detail: item.detail}"
            on-scroll="refresh">
            <p>{{title}}, {{date}}, {{detail}}</p>
        </slot>
    <div>
    `    
    attached(){
        console.log(this.el.offsetHeight)
    }
}


export default class App extends Component {
    constructor() {
        super(...arguments)
    }

    attached() {
        console.log("app")
        console.log(document.documentElement.clientHeight)
        this.el.style.height = document.documentElement.clientHeight + 'px'
        const conetent = this
        window.onresize = () => {
            return (() => {
                conetent.isResize = true;
                setTimeout(() => {
                    conetent.el.style.height = document.documentElement.clientHeight + 'px'
                    conetent.isResize = false
                }, 500)
            })()
        }

        const height = () => {
            var D = document;
            return Math.max(
                D.body.scrollHeight, D.documentElement.scrollHeight,
                D.body.offsetHeight, D.documentElement.offsetHeight,
                D.body.clientHeight, D.documentElement.clientHeight
            );
        }
        console.log(height())

    }
    static template = `
    <div class="content" 
        on-scroll="refresh"
        on-resize="resize"
        >
        app
        <content s-ref="son"
            data="{{data}}"
        >
            <h1>{{title}}</h1>
            <p>{{detail}}<b>{{date}}</b></p>
        </content>
    </div>
    `

    static components = {
        'content': Content
    }

    initData() {
        return {
            data: this.actions.data(),
            isResize: false,
            isAdding: false
        }
    }

    refresh() {
        console.log("!")
        const scrollTop = this.el.scrollTop,
            height = parseInt(this.el.style.height),
            total = this.ref('son').el.offsetHeight,
            isAdding = this.data.get('isAdding')

        
        if((scrollTop + height) / total > 0.8){
            if(!isAdding){
                this.data.set('isAdding', true)
                console.log("yes")
                setTimeout(() => {
                    this.actions.Add()
                    this.data.set('isAdding', false)
                }, 100)
            }else{
                console.log("请求太快")
            }

        }
    }

    resize() {
        console.log("???")
        this.el.style.height = document.documentElement.clientHeight + 'px'
    }
}