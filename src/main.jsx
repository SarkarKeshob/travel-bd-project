import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Components/Routes/Routes.jsx'
import TravelDetailsContext from './Components/Context/TravelDetailsContext/TravelDetailsContext.jsx'
import UserContext from './Components/Context/UserContext/UserContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TravelDetailsContext>
      <UserContext>
        <RouterProvider router={router}></RouterProvider>
      </UserContext>
    </TravelDetailsContext>
  </React.StrictMode>,
)
