class Content extends Component {
    constructor(){
        super(...arguments)
    }

    static template = `
    <div class="content">
        <slot s-for="item in data" s-bind="{title: item.title, date: item.date, detail: item.detail}">
            <p>{{title}}, {{date}}, {{detail}}</p>
        </slot>
    <div>
    `

}