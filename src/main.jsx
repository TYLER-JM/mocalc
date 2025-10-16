import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Theme } from '@radix-ui/themes'

import './main.css'
import Root from './Root.tsx'
import Help from './routes/help.tsx'
import Calculators from "./routes/calculators.tsx";
import Home from "./routes/home.tsx";
import Summary from "./routes/summary.tsx";
import RouteError from "./components/RouteError.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "calculators",
        element: <Calculators />
      },
      {
        path: "help",
        element: <Help />
      },
      {
        path: "summary",
        element: <Summary />
      },
      {
        path: "*",
        element: <RouteError />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme
      appearance="light"
      accentColor="teal"
      radius="medium"
      scaling="100%"
    >
      <RouterProvider router={router} />
    </Theme>
  </StrictMode>,
)
