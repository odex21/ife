import { Component } from 'san'

let testTodos = [
    {
        "title": "dfa",
        "done": false,
        "id": 54
    }
]

const addURLParam = (url, name, value) => {
    url += (url.indexOf('?')) == -1 ? "?" : "&"
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value)
    return url
}

let api = (process.env.NODE_ENV !== 'production') ? '/api' : ''
let url = api + "/todos.json"
const postUrl = api + "/api/todos"
// url = addURLParam(url, "name", "odex")
// url = addURLParam(url, "book", "Professional JavaScript")




export default class testApi extends Component {
    static template = `
    <button on-click="test()">手动更新</button>
    `
    test() {
        this.actions.update()
    }

}

function getURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}

function updateTodos() {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest()
        req.open('POST', postUrl, true)
        req.setRequestHeader("Content-type", "application/json; charset=utf-8")
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText)
            } else {
                reject(new Error(req.statusText));
            }
        }
        req.onerror = function () {
            reject(new Error(req.statusText));
        }
        req.send(JSON.stringify(testTodos))
    })
}

var request = {
    comment: function getComment() {
        return getURL(url).then(JSON.parse);
    },
    post: function getPeople() {
        return updateTodos()
    }
};
function main() {
    return request.post()
}
// 运行的例子
