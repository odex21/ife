import { Component } from 'san'

export default class input extends Component {

    static template = `
    <div class = "input">
    <input placeholder="{{placeholder}}" on-keyup="push($event)" type="{{type}}" value="{=value=}">
    </div>
    `

    push(e){//测试一下直接参数传value
        if(e.keyCode == 13){
            console.log("yes")
            this.fire('click', this.data.get('value'))
        }
    }
}