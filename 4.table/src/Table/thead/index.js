import { Component } from 'san'
import temp from './view.html'



export default class thead extends Component {

    static template = temp
    attached() {
        // console.log("thead attached")
        // const data = this.data.get('Columns'),
        //     dataCal = listDataCal(d)
    }

    sort(e) {
        if (e.sorter) this.fire('sort', e)
    }
    filter(e, i) {
        this.fire('filter', { target: e, index: i })
    }
}