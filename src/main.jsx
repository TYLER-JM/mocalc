import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './main.css'
import Root from './Root.jsx'
import Calculator from './routes/Calculator.tsx'
import About from './routes/about.jsx'
import Help from './routes/help.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "app",
        element: <Calculator />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "help",
        element: <Help />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
