import { Component } from 'san'
import moment from 'moment/min/moment.min'

import './date-table.styl'

const Weeks = ['一', '二', '三', '四', '五', '六', '日'];
export default class Datetable extends Component {
    constructor() {
        super(...arguments)
    }

    static template = `
    <table class="date-panel">
        <tr>
            <td s-for="day in  weeks" class="weeks">{{day}}</td>
        </tr>
        <tr s-for="row in tableRows">
            <td s-for="d in row" 
                on-click="select(d.moment)"
                class="{{d.class}}"
                >{{d.date}}</td>
        </tr>
    </table>

    `

    static computed = {
        MorS: function(){
            //返回0就是周日开始，返回1从周一开始
            return 1
        },
        weeks: function(){
            if(this.data.get('MorS')){
                return  Weeks
            }else{
                Weeks.unshift(Weeks.pop())
                return Weeks
            }
        },
        tableRows: function () {
            let tR = [];
            const now = this.data.get('sDate'),
                thismonth = new Date(now.year(), now.month(), 1),
                fisrtDate = moment(thismonth),
                today = this.data.get('today')
            console.log(fisrtDate)
            console.log(fisrtDate.day())
            console.log(this.data.get('MorS'))
            
            const fdIntable = (fisrtDate.day() !== 0) ?
                moment(fisrtDate).subtract((fisrtDate.day() - this.data.get('MorS')), 'd') :
                moment(fisrtDate).subtract(6, 'd');
            console.log(fdIntable)
            

            for (let i = 0; i < 6; i++) {
                let row = [];
                for (let j = 0; j < 7; j++) {
                    const dd = moment(fdIntable).add(i * 7 + j, 'd');
                    let clas
                    if(dd.month() == fisrtDate.month()){
                        clas = (dd.isSame(today, 'day')) ? 'today' : '';
                    }else{
                        clas = 'nothisM'
                    }
                    row[j] = {
                        date: dd.date(),
                        moment: dd,
                        class: clas
                    }
                }
                tR[i] = row
            }

            console.log(fdIntable.date())


            return tR

        }

    }

    select(date) {
        this.fire('selected', date)
        console.log(date.date())

    }

    initData() {
        return {
            today: moment()
        }

    }




}