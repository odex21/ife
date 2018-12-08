import { Component} from 'san'

export default class Button extends Component {
    static template = `
    <button on-click="click"><slot /></button>
    `

    click(){
        this.fire('click')
    }
}