/*
 main
 */

import React from 'react'
import ReactDom from 'react-dom'
import 'antd/dist/antd.css'
import App from './App'
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";
//read local user
const user = storageUtils.getUser()
memoryUtils.user = user
//Render the App component to the div of the index page
ReactDom.render(<App/>, document.getElementById('root'))