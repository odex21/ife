import { Component } from 'san'
import Schema from './async-validator/index'

export default class From extends Component {
    constructor() {
        super(...arguments)
    }

    static template = `
    <div class="form">
        <slot></slot>
    </div>
    `
    initData() {

        return {
            lableWidth: '100px',
            rules: [],
            lablePosition: 'left',
        }
    }

    validateFied(callback, rules, prop) {
        const schema = new Schema({[prop]:rules}),
            fModel = this.data.get('formModel')
        schema.validate(fModel[prop], callback)
    }

    validate(callback) {
        const rulesArray = this.data.get('rules'),
            formModel = this.data.get('formModel'),
            rules = {};

        for (let i = 0; i < rulesArray.length; i++) {
            const r = rulesArray[i]
            rules[r.prop] = r.rules
        }
        const rulesObject = {
            formModel: {
                type: "object", required: true,
                fields: rules
            }
        }

        console.log(rulesObject)
        console.log(formModel)
        const schema = new Schema(rulesObject);
        schema.validate({ formModel: formModel }, callback)

    }


    static messages = {
        'getRules': function (arg) {
            let rules = this.data.get('rules');
            rules.push(arg.value);
            this.data.set('rules', rules);
        },

        'checkNow': function(arg){
            const callback = (valid) => {
                if(valid){
                    console.log("success")
                    console.log(valid)
                    if(valid.length > 0){
                        arg.target.data.set('error', true)
                    }
                }else{
                    alert("???")
                }
            }

            this.validateFied(callback, arg.value.rules, arg.value.prop)
        }
    }

    resetFields(){
        this.data.set('formModel', {
            mobile: '',
            userName: '',
            idCard: '',
            address: ''
        },)
    }
}