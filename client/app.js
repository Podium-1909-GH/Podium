import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Toolbar from '@material-ui/core/Toolbar'

const App = () => {
  return (
    <div id="mainContainer">
      <Navbar id="navBar" />
      <Toolbar id="toolbar" />
      <Routes className="content" />
    </div>
  )
}

export default App
