import list from './list'
import {Component} from 'san';
import {transition} from 'san-transition'

export default class cli extends Component {
    constructor() {
        super(...arguments);
    }

    static template = `
        <div>
            <p>缺一个全局监听失焦事件</p>
            <input 
                on-click="showdata"
                placeholedr="选择内容"
                value="{{content}}"
                >
            <sm-li 
                s-if="{{open}}"
                data="{{data}}" 
                class="wrap" 
                on-chosed="chose($event)" 
                on-check="check($event)"
                s-transition="transition('slide', 300)"
                >
            </sm-li>
        </div>
    `
    static components = {
        'sm-li': list
    }

    transition(){
        return transition(...arguments)
    }

    showdata(){
        this.data.set('open', true);
    }
    //找不到好的事件扔这个
    closedata(e){
        console.log("dfafd")
        console.log(e.target.tagName)
        if(e.target.tagName !== 'sm-li')
        this.data.set('open', false)

    }

    chose(label){
        console.log("冒泡提交")
        this.data.set('open', false)
        this.data.set('content', label)
    }

    initData(){
        return {
            open: false,
            content: "",
            data: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            },  {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
            }]
        }
    }



}


