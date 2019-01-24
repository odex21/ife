import { Component } from 'san'
import temp from './view.html'
import './styl.styl'
import thead from './thead';
import td from './td';
import { checkboxTd, checkboxTh } from './selection';
import { quickSort } from './quickSort';
import filterPannel from './filterPanenl'
//table的宽度要自己设置


const escapeChars = (str) => {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/'/g, '&acute;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/\|/g, '&brvbar;');
    return str;
}

const showKeysRL = (col, rl) => {
    const newArr = col.filter(t => {
        return t.fixed === rl
    })
    // console.log(newArr)
    return showKeys(newArr)
}

const showKeys = (col) => {
    const arr = []
    for (let i = 0; i < col.length; i++) {
        // console.log(col[i])
        const fit = {
            title: col[i].title,
            width: (col[i].width) ? col[i].width : ''
        }
        if (col[i]['render']) {
            fit.render = col[i]['render']
            fit.args = col[i]['args']

        } else if (col[i]['dataIndex']) {
            fit.dataIndex = col[i]['dataIndex']
        }

        if (col[i].key) {
            fit.key = col[i].key
        }

        if (col[i].sorter) {
            fit.sorter = {
                sorter: col[i].sorter,
                state: 0
            }
            if (col[i].sortDirections) {
                const temp = col[i].sortDirections,
                    obj = {}

                if (temp.includes('ascend')) obj.ascend = true
                if (temp.includes('descend')) obj.descend = true
                fit.sorter.sD = obj
            }
        }

        if (col[i].filters) {
            const arr = col[i].filters
            fit.filters = {
                filter: arr
            }
        }

        arr.push(fit)
    }
    console.log(arr)
    return arr
}

const listDataCal = (data, col) => {
    // const rCol = col.filter(t => t.render)
    // console.log(rCol[0].key)
    data.forEach(t => {
        t.render = {}
        for (let i = 0; i < col.length; i++) {

            if (col[i].render) {
                // 取出args
                const args = ((t, Key) => {
                    const arr = []
                    for (let i = 0; i < Key.args.length; i++) {
                        arr.push(t[Key.args[i]])
                    }
                    return arr
                })(t, col[i])
                // 从render中渲染标签
                t.render[col[i].key] = col[i].render(...args)
            }
        }
    })
    return data
}
export default class Table extends Component {
    static template = temp

    static components = {
        's-thead': thead,
        's-td': td,
        'checkbox-td': checkboxTd,
        'checkbox-th': checkboxTh
    }

    attached() {
        //初始化表格数据
        const col = this.data.get('Columns'),
            data = this.data.get('listData'),
            fitR = showKeysRL(col, 'right'),
            fitL = showKeysRL(col, 'left'),
            _showKeys = showKeys(col)

        const sorters = _showKeys.filter(t => t.sorter)
        if (sorters.length) {
            // console.log(sorters)
            this.data.set('compare', sorters[0].sorter)
        }

        if (fitR.length > 0) {
            // console.log(fitR)
            this.data.set('RBfix', true)
            this.data.set('showKeysFitRight', fitR)
        }
        if (fitL.length > 0) {
            // console.log(fitL)
            this.data.set('LBfix', true)
            this.data.set('showKeysFitLeft', fitL)
        }

        const _listDataCal = listDataCal(data, _showKeys)

        const rS = this.data.get('rowSelection')
        if (rS) {
            console.log(rS)
            const arr = []
            _listDataCal.forEach(t => {
                t.record = rS.getCheckboxProps(t)
                if (!t.record.disabled) {
                    arr.push(t.record.name)
                }
            })
            this.data.set('selectedProps', arr)
            this.data.set('selectedRowKeys', [])
            this.data.set('allChecked', [])
        }

        this.data.set('showKeys', _showKeys)
        this.data.set('listDataCal', _listDataCal)
        this.data.set('listDataCalRow', [].concat(_listDataCal))

    }

    initData() {
        return {
            onWhere: 0,
            showdowRight: true,
            showdowLeft: false,
            onType: 1,
            checkboxClass: '',
            filterPannel: {}
        }
    }






    ///不需要的时候要关掉
    listScroll(e, i) {
        const check = this.data.get('onWhere')
        if (check !== i) return
        const t = e.target.scrollTop,
            headTarget = this.el.querySelector('.fixHeader'),
            l = e.target.scrollLeft
        headTarget.scrollLeft = l

        if (!this.data.get('LBfix') && !this.data.get('RBfix')) return
        const nameList = ['.thfix', '.listFix-body'],
            target_id = (i == 0) ? 1 : 0,
            target = this.el.querySelectorAll(nameList[target_id]),
            cWidth = e.target.clientWidth,
            offset = headTarget.querySelector('table').clientWidth - cWidth

        console.log(offset)
        // console.log("clientWidth: " + cWidth + " nowl: " + l)
        if (l !== 0 && l < offset) {
            this.data.set('showdowLeft', true)
            this.data.set('showdowRight', true)
            console.log("____")
        } else if (l >= offset) {
            this.data.set('showdowLeft', true)
            this.data.set('showdowRight', false)
            console.log("rrrrrrr")
        } else {
            this.data.set('showdowRight', true)
            this.data.set('showdowLeft', false)
        }

        target.forEach(temp => {
            temp.scrollTop = t
        })
    }

    wheelCheck(i) {
        this.data.set('onWhere', i)
    }

    showSelected(item, i) {
        const t = this.data.get('selectedRowKeys'),
            total = this.data.get('selectedProps').length

        console.log(t)

        if (t.includes(item.record.name)) {
            this.data.set('listDataCal.' + i + '.checked', true)
            console.log('t ' + i)

        } else {
            console.log('f ' + i)
            this.data.set('listDataCal[' + i + '].checked', false)
        }

        if (t.length !== 0 && t.length !== total) {
            console.log("??")
            this.data.set('checkboxClass', 'indeterminate')
        } else if (t.length === total) {
            this.data.set('checkboxClass', '')
            this.data.set("allChecked", ['all'])
        } else {
            this.data.set("allChecked", [''])
            this.data.set('checkboxClass', '')
        }

    }
    showAllcheck() {
        const change = (arr, t) => {
            this.data.set('selectedRowKeys', arr)
            this.data.set('checkboxClass', '')
            for (let i = 0; i < props.length; i++) {
                this.data.set('listDataCal[' + i + '].checked', t)

            }
        }
        const t = this.data.get('allChecked'),
            props = this.data.get('selectedProps')

        if (t.includes('all')) {
            change(props, true)

        } else {
            change([], false)

        }
        // console.log(t)


    }


    //还要调整
    hoverConnect(i) {
        // console.log(i)
        const temp = this.el.querySelector('.s-table-mainTbody')
        // console.log(temp)
        temp.childNodes[i + 1].classList.add('hover')
    }
    hoverDisConnect(i) {
        const temp = this.el.querySelector('.s-table-mainTbody')
        temp.childNodes[i + 1].classList.remove('hover')
    }



    sort(obj) {
        const
            ascend = (a, b) => {
                return obj.sorter.sorter(a, b) > 0
            },
            descend = (a, b) => {
                return obj.sorter.sorter(a, b) < 0
            }
        // let compare
        //还要做一个

        const defaultSort = (obj) => {
            const sD = obj.sorter.sD
            if (!sD) {

                switch (obj.sorter.state) {
                    case 0:

                        // console.log(0)
                        this.data.set('showKeys.' + obj.index + '.sorter.state', 1)
                        this.data.set('showKeys.' + obj.index + '.sorter.sorted', true)
                        return ascend
                    case 1:
                        // console.log(1)
                        this.data.set('showKeys.' + obj.index + '.sorter.state', 2)
                        this.data.set('showKeys.' + obj.index + '.sorter.sorted', true)

                        return descend
                    // break
                    default:
                        // console.log(2)
                        const
                            arrR = this.data.get('listDataCalRow')

                        this.data.set('showKeys.' + obj.index + '.sorter.state', 0)
                        this.data.set('showKeys.' + obj.index + '.sorter.sorted', false)
                        this.data.set('listDataCal', [].concat(arrR))

                        return
                }
            } else {

                switch (obj.sorter.state) {
                    case 0:
                        if (sD.ascend) {
                            this.data.set('showKeys.' + obj.index + '.sorter.state', 1)
                            this.data.set('showKeys.' + obj.index + '.sorter.sorted', true)

                            return ascend
                        }
                    case 1:
                        if (sD.descend) {
                            this.data.set('showKeys.' + obj.index + '.sorter.state', 2)
                            this.data.set('showKeys.' + obj.index + '.sorter.sorted', true)
                            return descend
                        }
                    default:
                        const
                            arrR = this.data.get('listDataCalRow')

                        this.data.set('showKeys.' + obj.index + '.sorter.state', 0)
                        this.data.set('showKeys.' + obj.index + '.sorter.sorted', false)

                        this.data.set('listDataCal', [].concat(arrR))

                        return
                }
            }
        }
        const compare = defaultSort(obj)
        if (!compare) return
        const arr = this.data.get('listDataCal')
        const start = new Date()
        const newArr = quickSort(arr, compare)
        this.data.set('listDataCal', [].concat(newArr))
        const end = new Date()
        const time = (end - start)
        console.log('time ' + time)

    }

    //先尝试动态加载组件
    filter(e) {
        console.log(e.index)
        let el = e.target.srcElement
        // console.log(el.nodeName)
        while (el.nodeName !== 'TH') {
            el = el.parentNode
        }

        const filters = this.data.get('showKeys.' + e.index).filters
        console.log(filters)
        filters.filter.forEach(t => t.checked = false)
        this.data.set('filters', filters.filter)
        const
            offsetL = el.offsetLeft,
            offsetT = el.offsetTop,
            elWidth = this.el.clientWidth,
            elHeight = el.clientHeight,
            scrollLeft = this.el.querySelector('.fixHeader').scrollLeft || 0,
            r = (offsetL + 100 - scrollLeft) / elWidth * 100


        this.data.set('position', {
            left: r + 'vw',
            top: (offsetT + elHeight) + 'px'
        })

        if (!this['filterPannel']) {
            this['filterPannel'] = {
                component: new filterPannel({
                    owner: this,
                    source: `<s-filter filters="{{filters}}" 
                    position="{= position =}"/>`
                }),
                index: e.index,
                filters: filters
            }
            this['filterPannel'].component.attach(this.el)
        }

    }


    static messages = {
        'filterPannelCancel': function () {
            console.log("close!!!!!")
            this.filterPannel = null
            const arrR = this.data.get('listDataCalRow')
            this.data.set('listDataCal', [].concat(arrR))

        },
        'filterBegin': function (e) {
            console.log('filter')
            console.log(e)
            // debugger
            const
                index = this.filterPannel.index,
                filters = e.value.filter(t => t.checked),
                //this.data.get('showKeys.' + index).filters.filter.filter(t => t.checked),
                key = this.data.get('showKeys.' + index).dataIndex,
                arr = this.data.get('listDataCalRow')
            console.log(filters.length)
            console.log(key)
            console.log(arr)
            const newArr = filters.length > 0 ? arr.filter(t => {
                for (let i in filters) {
                    if (t[key].indexOf(filters[i].value) > -1) return t
                }
            }) : arr
            console.log(newArr)
            // this.clearChecked()
            setTimeout(() => {
                this.data.set('listDataCal', newArr)
                this.filterPannel.component.dispose()
                this.filterPannel = null

            }, 0);

        }
    }

    close(e) {
        // console.log(321)
        let el = e.srcElement,
            cName = (typeof el.className === 'string') ? el.className : ''
        // console.log(cName.indexOf('s-table'))
        // console.log(cName)
        if (this.filterPannel) {
            console.log("有引用！")
            while (el.nodeName !== 'BODY') {
                el = el.parentNode
                cName = el.className
                console.log(cName)

                if (typeof el.className === 'string' && cName.indexOf('dropdown') !== -1) {
                    console.log("不关")
                    return
                }
            }
            console.log("close")
            // this.clearChecked()
            this.filterPannel.component.dispose()
            this.filterPannel = null
        }
    }
    clearChecked() {
        const f = this.filterPannel.filters
        // console.log(f)
        // console.log(typeof f.filter)
        f.filter.forEach(t => {
            t.checked = false
        });
        this.data.set('showKeys.' + f.index + ', filters', [].concat(f.filters))
    }
}

