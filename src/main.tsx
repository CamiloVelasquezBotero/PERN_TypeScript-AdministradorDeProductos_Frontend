import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} /> {/* Le pasamos el componente que nos da reac-router-dom y le pasamos el router que creamos con (createBrowserRouter) */}
  </StrictMode>,
)
