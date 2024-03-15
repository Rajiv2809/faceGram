import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Componnets/DefaultLayout";
import GuestLayout from "./Componnets/GuestLayout";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Home from "./Views/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path:'/homepage',
                element:<Home/>
            }
        ]
        
    },
    {
        path:'/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            }
        ]
    }
])

export default router;