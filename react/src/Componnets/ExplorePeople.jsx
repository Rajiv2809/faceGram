import React, { useEffect, useState } from 'react'
import axiosClient from '../Axios'

export default function ExplorePeople() {
    const [loading, setLoading] = useState(true)

    const [users, setUSers] = useState([])
    useEffect(() => {
        axiosClient.get('/users').then(({data}) => {
            setUSers(data.users.slice(0, 6))
            setLoading(false)
        }).catch((err) => {
            console.log('Error: ', err);
        })
    }, [])

  return (
    <>

    <div class="explore-people">
        <h6 class="mb-3">Explore People</h6>
        <div class="explore-people-list">
    {!loading && users.length && users.map (user => (
            <div class="card mb-2">
                <div class="card-body p-2">
                    <a href={`/user/${user.username}`}>@{user.username}</a><br />
                </div>
            </div>
            ))}
        </div>
    </div>
    
    </>
  )
}
