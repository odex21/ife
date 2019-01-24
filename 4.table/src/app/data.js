export {
    dataSource as dataSource,
    columns as columns
}

const dataSource = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
}];

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => `<a href="javascript:;">${text}</a>`,
    args: ['name']
}, {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
    sortDirections: ['descend'],
}, {
    title: 'Address',
    dataIndex: 'address',
    filters: [{
        text: 'London',
        value: 'London',
    }, {
        text: 'New York',
        value: 'New York',
    }],
}];

const columns2 = [
    {
        title: 'Full Name', width: 100, dataIndex: 'name', key: 'name',
        fixed: 'left',
        render: (name) => {
            return `<a href="javascript:;">${name}</a>`
        },
        args: ['name', 'key']
    },
    {
        title: 'Age', width: 100, dataIndex: 'age', key: 'age',
        fixed: 'left',
    },
    {
        title: 'Column 1', dataIndex: 'address', key: '1', width: 150,
    },
    {
        title: 'Column 2', dataIndex: 'address', key: '2', width: 150,
    },
    {
        title: 'Column 3', dataIndex: 'address', key: '3', width: 150,
    },
    {
        title: 'Column 4', dataIndex: 'address', key: '4', width: 150,
    },
    {
        title: 'Column 5', dataIndex: 'address', key: '5', width: 150,
    },
    {
        title: 'Column 6', dataIndex: 'address', key: '6', width: 150,
        filters: [{
            text: 'London',
            value: 'London',
        }, {
            text: 'New York',
            value: 'New York',
        }],
    },
    {
        title: 'Column 7', dataIndex: 'address', key: '7', width: 150,
    },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
        title: 'Action',
        key: 'operation',
        // dataIndex: 'action',
        // fixed: 'right',
        width: 100,
        render: () => {
            return `<a ref='javascript:;'>Delete</a>`
        },
        args: []
    },
];

const data = [];
for (let i = 0; i < 150; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: Math.floor(Math.random() * 30 + 18),
        address: `London, Park Lane no. ${i}`,
        // action: 'delete'
    });
}












