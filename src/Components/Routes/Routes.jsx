import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Root/Root";
import LeftSideContent from "../Pages/Home/LeftSideContent/LeftSideContent";
import BookingDetails from "../Pages/BookingDetails/BookingDetails";
import BookHotel from "../Pages/BookHotel/BookHotel";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";



   const router=createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
                children:[
                    {
                        path:'/:id',
                        element:<LeftSideContent></LeftSideContent>
                    },
                    {
                        path:'/',
                        element:<LeftSideContent></LeftSideContent>
                    }
                ]
            },
            {
                path:'/bookingDetails/:id',
                element:<BookingDetails></BookingDetails>
            },
            {
                path:'/bookHotels/:id',
                element:<PrivateRoute><BookHotel></BookHotel></PrivateRoute>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            }
        ]

    },
    
   ])


export default router;