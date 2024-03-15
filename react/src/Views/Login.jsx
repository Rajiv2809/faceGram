import React, { useState } from "react";
import { useStateContext } from "../Contexts/Context";
import axiosClient from "../Axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setCurrentUser, setToken, showToast,  userToken  } = useStateContext();
    const navigate = useNavigate();

    
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.post('/auth/login', {
            username,
            password
        }).then(({data}) => {
            showToast(data.message)
            setToken(data.token);
            
        }).catch((err) => {
            showToast(err.response.data.message);
        })  
    }

    if(userToken){
        return  <Navigate to="/homepage" />
    }

    

    return (
    <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div class="container">
            <a class="navbar-brand m-auto">
                Facegram
            </a>
            </div>
        </nav>
        
        <main class="mt-5">
            <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-5">
                <div class="card">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                    <h5 class="mb-0">Login</h5>
                    </div>
                    <div class="card-body">
                    <form  method="post" onSubmit={onSubmit}>
                        <div class="mb-2">
                        <label for="username">Username</label>
                        <input
                            type="text"
                            class="form-control"
                            id="username"
                            name="username"
                            value={username} onInput={e => setUsername(e.target.value)}

                        />
                        </div>

                        <div class="mb-3">
                        <label for="password">Password</label>  
                        <input
                            type="password"
                            class="form-control"
                            id="password"
                            name="password"
                            value={password} onInput={e => setPassword(e.target.value)}
                        />
                        </div>

                        <button type="submit" class="btn btn-primary w-100">
                        Login
                        </button>
                    </form>
                    </div>
                </div>

                <div class="text-center mt-4">
                    Don't have account? <a href="/register">Register</a>
                </div>
                </div>
            </div>
            </div>
        </main>
    </>
  );
}
