import { Component } from 'san'
import moment from 'moment/min/moment.min'
import monthPanel from './month-panel'

export default class monthTable extends Component {
    constructor(){
        super(...arguments)
    }

    static components = {
        'month-panel': monthPanel
    }

    static template = `
    <div class="month-table">
        <input class="prebutton" type="button" value="<" on-click="preYear">
        <span class="choseYM" on-click="choseYear">{{year}}年</span> 
        <input class="nextbutton" type="button" value=">" on-click="nextYear">
        <month-panel
            class="month-panel"
            sDate="{{sDate}}"
        ></month-panel>
    </div>
    `
    static computed = { 
        year: function(){
            return this.data.get('sDate').year()
        }
    }

    preYear(){
        const sDate = this.data.get('sDate'),
        nDate = moment(sDate).subtract(1, 'year')
        this.data.set('sDate', nDate)  
    }

    nextYear(){
        const sDate = this.data.get('sDate'),
            nDate = moment(sDate).add(1, 'year')
        this.data.set('sDate', nDate)
    }

    choseYear(){
        this.fire('yearSelect')
    }
}