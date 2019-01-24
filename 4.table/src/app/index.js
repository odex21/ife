import table from '../Table/index'
import { Component } from 'san'
import temp from "./view.html";
import { dataSource, columns } from './data'


export default class app extends Component {
    static template = temp

    static components = {
        's-table': table
    }

    initData() {
        return {
            columns: columns,
            dataSource: dataSource,
            rowSelection: {
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                },
                getCheckboxProps: record => ({
                    disabled: record.name === 'Disabled User',
                    name: record.name
                })
            }
        }
    }
    attached() {
        const t = this.data.get('colunms')
        // console.log(t)
    }
}