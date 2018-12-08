import {Component} from 'san';
import './list.styl'
import {transition} from 'san-transition'

export default class list extends Component {
    constructor(){
        super(...arguments)
    }

    static components = {
        'rec-li': 'self'
    }
    static template = `
        <div>
            <ul>
                <template s-for="l, index in data">
                    <li  
                        on-click="click(index)" 
                        on-mouseover="toggle(index)"
                        >
                        {{l.label}}
                    </li>
                </template>
            </ul>
            <template s-for="l, index in data" on-chosed="chose($event)">
                <rec-li 
                    s-if="{{l.children && l.open}}" 
                    data="{{l.children}}"
                    on-chosed="chose($event, index)"
                    s-transition="transition('slide')"
                    ></rec-li>
            </template>
        </div>

    `


    attached() {
        console.log("!!!!!!!!!!!!!!!!!!!!view刷新")
        let data = this.data.get('data')
        //初始化抽屉数据
        for(let i = 0; i < data.length; i++){
            this.data.merge('data.' + i, {open: false})
        }
        this.fire('check', "@!!!!!!!!")
    }

    detach() {
        console.log("某组件移除了")
    }

    transition(){
        return transition(...arguments)
    }



    toggle(index) {
        let data = this.data.get('data');
        if(!data[index].open){//没打开，打开

            for(let i = 0; i < data.length; i++){
                if(i !== index)
                this.data.set('data.' + i + '.open', false)
            }
            const self = this;
            self.data.set('data.' + index + '.open', !this.data.get('data.' + index + '.open'))
        }


    }

    click(index){
        this.toggle(index)
        let data = this.data.get('data');

        if(!data[index].children){
            let c = data[index].label
            this.fire('chosed', c)
            this.fire('check', c)
        }


    }

    chose(label, index){
        let data = this.data.get('data');
        let c = data[index].label + ' > '+ label
        this.fire('chosed', c)
        console.log(c)
    }

        
}