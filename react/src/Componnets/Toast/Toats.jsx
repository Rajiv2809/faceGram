import React from 'react'
import { useStateContext } from '../../Contexts/Context';
import './style.css';
export default function Toats() {
    const {toast} = useStateContext();
  return (
   <>
    {toast.show && (
        <div className='bg-light notif fixed-to'>{toast.message}</div>
    )}
   
   </>
  )
}
