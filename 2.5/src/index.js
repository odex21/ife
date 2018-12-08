//import './style.css';
import Table from './checkbox.san';
import input from './input.san';
import './main.css';

console.log(process.env.NODE_ENV)


SetTitle('输入框', 'Input', '待补充');
let b = new input().attach(document.body);
SetTitle('输入框', 'Input', '待补充');
let a = new Table().attach(document.body);


function SetTitle(Cname, Name, Content){

    let div = create('titleArea', '', 'div')

    let sdiv = create('cname', Cname, 'h1');
    sdiv.appendChild(create('logo', '控件', 'p'))
    sdiv.appendChild(create('name', Name, 'p'))
    
    div.appendChild(sdiv);
    div.appendChild(create('content', Content, 'p'))

    document.body.appendChild(div);
    //create('cname', Cname, 'p')
    //create('name', Name, 'p')
    //create('logo', '控件', 'p')
    //create('content', Content, 'p')

    function create(name, content, div){
        let p = div || 'div';
        let block = document.createElement(p);
        block.setAttribute('class', name);
        block.innerHTML = content;
        return block;
    }


}




