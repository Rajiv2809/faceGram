import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Toats from './Toast/Toats'
import { useStateContext } from '../Contexts/Context'
import axiosClient from '../Axios';

export default function DefaultLayout() {
    const { currentUser, setCurrentUser, userToken, setToken, showToast} = useStateContext();

    
    useEffect(() => {
        axiosClient.get('/me').then(({data}) => {
            setCurrentUser(data);
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    if(!userToken ){
        return <Navigate to='/login'/>
    }

    const logout = (e) => {
        axiosClient
          .post("/auth/logout")
          .then(({ data }) => {
            showToast(data.message);
            setToken(null);
          })
          .catch((err) => {
            showToast(err.response.data.message);
          });
      };

  return (
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div class="container">
                <a class="navbar-brand" href="/homepage">Facegram</a>
                <div class="navbar-nav">
                    <a class="nav-link" href={`/user/${currentUser.username}`}>{currentUser.username}</a>
                    <a class="nav-link" style={{ cursor:"pointer" }} onClick={logout}>Log out</a>
                </div>
            </div>
        </nav>  
        <Outlet />
        <Toats />

    </div>
  )
}
