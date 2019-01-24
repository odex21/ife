import { Component } from 'san'

class td extends Component {
    static template = `                        
    <td class="s-table-checkbox">
        <div>
            <label>
                <span>
                    <input type="checkbox" value="{{item.record.name}}" checked="{= selectedRowKeys =}"
                        disabled="{{item.record.disabled}}" on-click="showSelected(item, index)">
                    <span class="s-table-checkbox-inner"></span>
                </span>
            </label>
        </div>
    </td>`

    showSelected() {
        // console.log("?????")
        setTimeout(() => {
            this.fire('checked')
        }, 0)
    }
    attached() {
    }
}
class th extends Component {
    static template = `                        
    <th  class="s-table-checkbox {{checkboxClass}}">
        <div>
            <label>
                <span>
                    <input type="checkbox" value="all" checked="{= allChecked =}" on-click="showSelected">
                    <span class="s-table-checkbox-inner"></span>
                </span>
            </label>
        </div>
    </th>`

    showSelected() {
        setTimeout(() => {
            this.fire('allchecked', { ...arguments })
        }, 0)
    }
    attached() {
    }
}


export {
    td as checkboxTd,
    th as checkboxTh,
}