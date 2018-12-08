import Span from './span.san';
import './main.css'
import Task from './task.san'
console.log(process.env.NODE_ENV)


let a = new Task().attach(document.body);

new Span().attach(document.body);

import moment from 'moment';
import san from 'san';
import {transition} from 'san-transition'

const ListTransition = san.defineComponent({
    template: `<ul>
      <li s-for="item in list trackBy item" s-transition="transition('slide', 300)">{{time}}Listed element with transition effects.</li>
    </ul>`,
    initData () {
      return {
        list: [1, 2, 3, 4, 5],
        time: moment().format("MM-DD-YYYY")
      }
    },
    transition
  })

  new ListTransition().attach(document.body)

