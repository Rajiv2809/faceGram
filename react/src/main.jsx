import React from 'react'
import ReactDOM from 'react-dom/client'
import './Styles/bootstrap.css'
import './Styles/style.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'
import { ContextProvider } from './Contexts/Context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>,
)
