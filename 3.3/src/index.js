console.log(process.env.NODE_ENV)

import App from './app.js'
import form from './form.san'

new App().attach(document.body)

new form().attach(document.body)


