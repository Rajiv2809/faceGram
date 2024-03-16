import React, { useState } from 'react'
import axiosClient from '../Axios';
import { useStateContext } from '../Contexts/Context';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [full_name , setFull_name]= useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [bio, setBio] = useState();
    const [is_private, setIs_private] = useState(false);
    const { showToast } = useStateContext();
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.post('/auth/register', {
            full_name,
            username,
            password,
            bio,
            is_private
        }).then(({data}) => {
            showToast(data.message);
            navigate('/login');
        }).catch((err) => {
            showToast(err.response.data.message)
        })
    }
    
  return (
    <>
        
        <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container">
        <a class="navbar-brand m-auto" href="index.html">Facegram</a>
    </div>
</nav>

<main class="mt-5">
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h5 class="mb-0">Register</h5>
                    </div>
                    <div class="card-body">
                        <form method='post' onSubmit={onSubmit}>
                            <div class="mb-2">
                                <label for="full_name">Full Name</label>
                                <input value={full_name} onInput={e => setFull_name(e.target.value)} type="text" class="form-control" id="full_name" name="full_name"/>
                            </div>

                            <div class="mb-2">
                                <label for="username">Username</label>
                                <input value={username} onInput={e => setUsername(e.target.value)} type="text" class="form-control" id="username" name="username"/>
                            </div>

                            <div class="mb-3">
                                <label for="password">Password</label>
                                <input value={password} onInput={e => setPassword(e.target.value) } type="password" class="form-control" id="password" name="password"/>
                            </div>

                            <div class="mb-3">
                                <label for="bio">Bio</label>
                                <textarea value={bio} onInput={e => setBio(e.target.value)} name="bio" id="bio" cols="30" rows="3" class="form-control"></textarea>
                            </div>

                            <div className="mb-3 d-flex align-items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    id="is_private" 
                                    name="is_private" 
                                    checked={is_private}  
                                    onChange={e => setIs_private(e.target.checked)}  
                                />
                                <label htmlFor="is_private">Private Account</label>
                            </div>

                            <button type="submit" class="btn btn-primary w-100">
                                Register
                            </button>
                        </form>
                    </div>
                </div>

                <div class="text-center mt-4">
                    Already have an account? <a href="/login">Login</a>
                </div>

            </div>
        </div>
    </div>
</main> 
        

    
    
    </>
  )
}
