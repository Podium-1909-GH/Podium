import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div id="mainContainer">
      <Navbar id="navBar" />
      <Routes className="content" />
    </div>
  )
}

export default App
