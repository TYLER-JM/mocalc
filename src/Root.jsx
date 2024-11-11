import {NavLink, Outlet} from 'react-router-dom'

function Root() {

  return (
    <>
      <nav>
        <NavLink to="/calculators">Get Started</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/help">Help</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
      
    </>
  )
}

export default Root
