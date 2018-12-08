import {Component} from 'san';
import DatePicker from './components/DatePicker/datePicker'


export default class App extends Component {
    constructor(){
        super(...arguments)
    }

    static template = `
    <div>
        test! 2018/11/26

        <date-picker>
        </date-picker>

    </dic>
    
    `
    static components = {
        'date-picker' : DatePicker,
    }
    

    
    
    
}