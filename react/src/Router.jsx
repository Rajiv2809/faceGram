import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./Componnets/DefaultLayout";
import GuestLayout from "./Componnets/GuestLayout";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Home from "./Views/Home";
import User from "./Views/User";
import CreatePost from "./Componnets/CreatePost";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/homepage" />
            },
            {
                path:'/homepage',
                element:<Home/>
            },
            {
                path:'/user/:username',
                element: <User/>
            },
            {
                path:'/create/post',
                element: <CreatePost/>
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