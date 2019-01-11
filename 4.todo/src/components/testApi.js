import { Component } from 'san'

const test = () => {
    console.log("test")
}
const addURLParam = (url, name, value) => {
    url += (url.indexOf('?')) == -1 ? "?" : "&"
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value)
    return url
}

let api = (process.env.NODE_ENV !== 'production') ? '/api' : ''
let url = api + "/example.txt"
url = addURLParam(url, "name", "odex")
url = addURLParam(url, "book", "Professional JavaScript")




export default class testApi extends Component {
    static template = `
    <button on-click="test()">test</button>
    `
    test() {
        console.log("test")
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    console.log(xhr.statusText)
                    console.log(xhr.responseType + " " + xhr.responseText)
                } else {
                    console.log("error " + xhr.status)
                }
            }
        }
        xhr.open("get", url, false)
        xhr.setRequestHeader("myHeader", "myValue")
        xhr.send(null)
    }

}