import { Component, DataTypes } from 'san'
import {transition} from 'san-transition'
import dateTable from './table/date-table'
import yearTable from './table/year-table'
import monthTable from './table/month-table'
import moment from 'moment/min/moment.min'
import './table/date-table.styl'

export default class DatePicker extends Component {
    constructor() {
        super(...arguments)
    }

    static template = `
        <div class="date-picker-wrap">
        <input type="text" value="{{date}}" on-click="open"><br />
          <div class="date-picker" s-if="{{ok}}" s-transition="transition('slide', 300)">
            <date-table 
              sDate="{{sDate}}"
              on-selected="chosed($event)" 
              on-selectedC="chosedClose($event)" 
              style="display:{{dateShow ? 'block': 'none'}}"
              on-yearSelect="yearSelect"
              on-monthSelect="monthSelect"
              ></date-table>
            <year-table
              sDate="{{sDate}}"
              style="display:{{yearShow ? 'block': 'none'}}"
            ></year-table>
            <month-table
              sDate="{{sDate}}"
              on-yearSelect="yearSelect"
              style="display:{{monthShow ? 'block': 'none'}}"
              ></month-talbe>
          </div>
        </div>
    
    `
    static components = {
        'date-table': dateTable,
        'year-table': yearTable,
        'month-table': monthTable
    }

    static computed = {
        date: function () {
            let sDate = this.data.get('sDate')
            console.log(sDate)
            return sDate.year() + '-' + (sDate.month() + 1) + '-' + sDate.date()
        },

    }

    transition(){
        return transition(...arguments)
    }

    open(){
        this.data.set('ok', true)
    }

    chosed(date) {
        this.data.set('sDate', date)
    }    
    chosedClose(date) {
        this.data.set('sDate', date)
        this.data.set('ok', false)
    }

    initData() {
        return {
            sDate: moment(),
            dateShow: true,
            yearShow: false,
            monthShow: false,
            ok: false
        }
    }

    yearSelect() {
        console.log("Y")
        this.data.set('dateShow', false)
        this.data.set('monthShow', false)
        this.data.set('yearShow', true)
    }    
    
    monthSelect() {
        console.log("M")
        this.data.set('dateShow', false)
        this.data.set('monthShow', true)
    }

    static messages = {
        'yearChose': function (year) {
            console.log(year)
            this.data.set('yearShow', false)
            this.data.set('dateShow', false)
            this.data.set('monthShow', true)
            const ndate = moment(this.data.get('sDate')).set('year', year.value)
            this.data.set('sDate', ndate)

        },

        'monthChose': function (month) {
            console.log(month)
            this.data.set('monthShow', false)
            this.data.set('dateShow', true)
            const ndate = moment(this.data.get('sDate')).set('month', month.value - 1)
            this.data.set('sDate', ndate)
        },
    }

    static datatypes = {
        sDate: DataTypes.instanceOf(moment)
    }
}
