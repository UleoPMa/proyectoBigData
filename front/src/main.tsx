import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import InicioSesion from './rutas/InicioSesion.tsx'
import Registro from './rutas/Registro.tsx'
import Inicio from './rutas/Inicio.tsx'
import RutaProtegida from './rutas/RutaProtegida.tsx'
import { AuthProvider } from './autenticacion/AuthProvider.tsx'

const router = createBrowserRouter([
  {
    path :"/",
    element: <InicioSesion />,
  },
  {
    path:"/Registro",
    element: <Registro />
  },
  {
    path:"/",
    element: <RutaProtegida />,
    children: [
      {
        path:"/Inicio",
        element: <App />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
