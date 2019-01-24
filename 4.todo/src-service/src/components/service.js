const clone = (source) => {
	//只克隆自身的值，不克隆继承的值
	return Object.assign({}, source)
}

let api = (process.env.NODE_ENV !== 'production') ? '/api' : ''
const url = api + "/todo/todos.json"
const postUrl = api + "/api/todos"

function getTodos(URL) {
	return new Promise(function (resolve, reject) {
		var req = new XMLHttpRequest();
		req.open('GET', URL, true);
		req.onload = function () {
			if (req.status === 200) {
				const str = req.responseText
				window.localStorage.setItem("todos", str)
				resolve("ok");
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

function updateTodos(todos) {
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
		req.send(JSON.stringify(todos))
	})
}

// 运行的例子


export default {
	addTodo(todo) {
		return this.Todos().then(todos => {
			let id = 1;

			if (todos[0]) {
				id = todos[0].id + 1;
			}
			let _todo = {
				title: todo.title,
				done: false,
				id: id
			};
			todos.unshift(_todo)
			this.Save(todos)
			return _todo
		})

	},

	editTodo(todo_) {//可能要修改，没做disaptch方法
		const todo = clone(todo_);
		this.Todos().then(todos => {
			let index = todos.findIndex(item => item.id === todo.id);
			todos[index] = todo
			this.Save(todos)
		})
	},

	Todos() {
		const str = window.localStorage.getItem('todos')
		const todos = JSON.parse(str || '[]');
		return new Promise(resolve => {
			resolve(todos)
		})
	},

	Save(todos) {
		console.log(JSON.stringify(todos))
		window.localStorage.setItem("todos", JSON.stringify(todos))
	},

	rmTodo(todo) {
		const todos = JSON.parse(window.localStorage.getItem('todos') || '[]');
		const index = todos.findIndex(item => item.id === todo.id);
		console.log(index)
		todos.splice(index, 1);
		this.Save(todos)

		return new Promise((resolve) => {
			resolve()
		})
	},

	doneTodo(todo) {
		return this.Todos().then(todos => {
			const index = todos.findIndex(item => item.id === todo.id);

			//突然发现，其实没必要克隆，每次拿到的都是新数组

			todos[index].done = !todos[index].done;
			this.Save(todos)
			return todos[index];
		})
	},
	update(todos) {
		updateTodos(todos)
	},
	getTodos() {
		return getTodos(url)
	}
}