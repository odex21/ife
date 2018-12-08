import { Component, DataTypes } from 'san'
import moment from 'moment/min/moment.min'

export default class yearPanel extends Component {
    constructor(){
        super(...arguments)
    }

    static template = `
    <div class="month-panel">
        <div s-for="month in months" on-click="chose(month)">{{month}}月</div>
    </div>
    `
    initData(){
        return {
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }
    }

    chose(month){
        console.log("monthchose")
        this.dispatch('monthChose', month)
    }

    static datatypes = {
        sDate: DataTypes.instanceOf(moment)
    }
}