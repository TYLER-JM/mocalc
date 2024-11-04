import { Link, Outlet } from 'react-router-dom'

function Root() {

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/calculators">Get Started</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/help">Help</Link></li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
      
    </>
  )
}

export default Root
