import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Toats from './Toast/Toats'
import { useStateContext } from '../Contexts/Context'
import axiosClient from '../Axios';

export default function DefaultLayout() {
    const { setCurrentUser} = useStateContext();
    const [username, setUsername] = useState({}) 
    
    useEffect(() => {
        axiosClient.get('/me').then(({data}) => {
            setUsername(data.username);
        }).catch((err) => {
            console.log(err)
        })
    }, [])

  return (
    <div>
        <Outlet user={username} />
        <Toats />

    </div>
  )
}
