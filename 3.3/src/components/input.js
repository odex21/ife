import { Component} from 'san'

export default class Input extends Component {

    static template = `
    <div>
        <input type='text' value="{=value=}" on-blur="inputed">
    </div>
    `

    inputed(){
        console.log('???')
        this.dispatch('inputed')
    }

}

