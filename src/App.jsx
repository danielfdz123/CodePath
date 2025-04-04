import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className = "container">
        <div className = "logoContainer">
          <img src = "logo.webp" className = "logoImg"/>
        </div>
        <div className = "navBarContainer">
          <div className = "navBarContent">
              <h1> navBar</h1>
          </div>
        </div>
        <div className = "quickInfo">
          <div className = "infoBox"> Box 1 </div>
          <div className = "infoBox"> Box 2 </div>
          <div className = "infoBox"> Box 3 </div>
        </div>
        <div className = "contentDiv">
          <div className = "content">
            <h1> Hi </h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
