import { Component } from 'san'
import datePanel from './date-panel'
import moment from 'moment/min/moment.min'

export default class DatePicker extends Component {

    constructor() {
        super(...arguments)
    }

    static components = {
        'date-panel': datePanel
    }

    static template = `
        <div class="date-table">
            <div class="select-panel">
                <input class="prebutton" type="button" on-click="preyear" value="《">
                <input class="prebutton" type="button" on-click="preMonth" value="<">
                <span class="choseYM" on-click="choseYear">{{year}}年</span> 
                <span class="choseYM" on-click="choseMonth">{{month}}月</span> 
                <input class="nextbutton" type="button" on-click="nextyear" value="》">
                <input class="nextbutton" type="button" on-click="nextMonth" value=">">
            </div>
            <table>
            </table>
            <date-panel
                sDate = "{{sDate}}"
                san-ref="son"
                on-selected="selected($event)"
            ></date-panel>
        </div>
    
    `
    initData() {
        return {
            data: [],
        }
    }

    static computed = {
        year: function () {
            return this.data.get('sDate').year()
        },
        month: function () {
            return this.data.get('sDate').month() + 1
        }
    }

    selected(date) {
        console.log(date.day());
        this.data.set('sDate', date);
        const sDate = this.data.get('sDate');
        console.log(sDate)
        this.fire('selectedC', date)

    }

    preMonth() {
        const sDate = this.data.get('sDate'),
            nDate = moment(sDate).subtract(1, 'month')
        this.data.set('sDate', nDate, 'force')
        this.fire('selected', nDate)

    }

    nextMonth() {
        const sDate = this.data.get('sDate'),
            nDate = moment(sDate).add(1, 'month')
        this.data.set('sDate', nDate, 'force')
        this.fire('selected', nDate)

    }

    preyear() {
        const sDate = this.data.get('sDate'),
            nDate = moment(sDate).subtract(1, 'year')
        this.data.set('sDate', nDate, 'force')
        this.fire('selected', nDate)

    }

    nextyear() {
        const sDate = this.data.get('sDate'),
            nDate = moment(sDate).add(1, 'year')
        this.data.set('sDate', nDate, 'force')
        this.fire('selected', nDate)

    }

    choseYear(){
        this.fire('yearSelect')
    }
    
    choseMonth(){
        this.fire('monthSelect')
    }

}