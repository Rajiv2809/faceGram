import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Toats from './Toast/Toats'
import { useStateContext } from '../Contexts/Context'

export default function GuestLayout() {
    const {userToken , currentUser } = useStateContext();
 

  return (
   <>
    <Outlet />
    <Toats/>
   </>

  )
}
