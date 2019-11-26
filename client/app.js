import React from 'react'

import {Navbar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div id="mainContainer">
      <Navbar id="navBar" />
      <Routes className="content" />
      <Footer />
    </div>
  )
}

export default App
