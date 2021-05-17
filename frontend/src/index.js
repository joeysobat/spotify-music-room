import App from './components/App'
import ReactDOM from 'react-dom'
import React from 'react'
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

ReactDOM.render(<App />, document.getElementById("root"))