import { Component } from 'san'
import './css.styl'

export default class FormItem extends Component {
    constructor() {
        super(...arguments)
    }

    static template = `
    <div class="{{error ? 'form-item error' : 'form-item'}}">
        <div class="label">
        <span s-if="{{require}}">*</span>
        {{label}}
        </div>
        <slot></slot>
        <div s-if="{{error}}" class="help-text">{{helpText}}</div>
    </div>
    `

    initData() {

        return {
            require: false,
            labelWidth: '100px',
            rules: [],
            labelPosition: 'left',
            error: false,
        }
    }

    attached() {
        const prop = this.data.get('prop'),
            rules = this.data.get('rules')
        this.dispatch('getRules', { rules: rules, prop: prop })
    }


    static messages = {
        'inputed': function(){
            console.log("2222")
            const prop = this.data.get('prop'),
            rules = this.data.get('rules')
            this.dispatch('checkNow', { rules: rules, prop: prop })
        }
    }
}