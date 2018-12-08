import { Component } from 'san'

export default class monthTable extends Component {
    constructor() {
        super(...arguments)
    }

    static template = `
    <div>
        <div s-for="year in years" on-click="chose(year)">{{year}}</div>
    </div>
    `

    static computed = {
        years: function(){
            const sDate = this.data.get('sDate');
            let table = [], rows = [];
            let nYear = sDate.year() - 4
            for(let i = 0; i < 10; i++){
                table[i] = nYear + i
            }                

            return table
        }
        
    }

    chose(year){
        console.log("yearchose")
        this.dispatch('yearChose', year)
    }
}