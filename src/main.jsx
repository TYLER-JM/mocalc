import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './main.css'
import Root from './Root.jsx'
import About from './routes/about.jsx'
import Help from './routes/help.jsx'
import Calculators from "./routes/calculators.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "calculators",
        element: <Calculators />
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
