import { Link, Outlet } from 'react-router-dom'
import './Root.css'

function Root() {

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/app">Get Started</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/help">Help</Link></li>
        </ul>
      </nav>
      <main>
        Main Content, the outlet will go here
        <Outlet />
      </main>
      <footer>footer</footer>
      
    </>
  )
}

export default Root
