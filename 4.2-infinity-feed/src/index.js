import App from './components/infinity'
import './css.styl'
import { connect } from 'san-store'
import './components/actions'

connect.san(
    {data: 'data'},
    {
        Add: 'addData',
        data: 'fetchData'
    }
)(App)


new App().attach(document.body.children['app'])