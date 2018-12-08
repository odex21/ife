import { Component } from 'san'
import yearPanel from './year-panel'
import moment from 'moment/min/moment.min'

export default class yearTable extends Component {
    constructor() {
        super(...arguments)
    }

    static components = {
        'year-panel': yearPanel
    }

    static template = `
    <div class="year-table">
        <div>
            <input class="prebutton" type="button" value="<" on-click="preYears">
            {{year1}}年 - {{year2}}年
            <input class="nextbutton" type="button" value=">" on-click="nextYears">
        </div>
        <year-panel
            class="year-panel"
            sDate="{{sDate}}"
        ></year-panel>
    </div>
    `
    static computed = {
        year1: function(){
            return this.data.get('sDate').year() - 4
        },  
        year2: function(){
            return this.data.get('sDate').year() + 5
        }
    }

    preYears(){
        const sDate = this.data.get('sDate'),
            nDate = moment(sDate).subtract(10, 'year')
        this.data.set('sDate', nDate)
    }    
    
    nextYears(){
        const sDate = this.data.get('sDate'),
            nDate = moment(sDate).add(10, 'year')
        this.data.set('sDate', nDate)
    }
}