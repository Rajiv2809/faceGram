import { createContext, useContext, useState } from "react";



const StateContext = createContext({
    currentUser: {},
    userToken: null,
    toast: {
        message: '',
        show: false,
    },
    setCurrentUser: () => {},
    setUserToken: () => {},
    setToast: () => {},
    setToken: () => {},
    showToast: () => {}
   
})

export const ContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
    const [userToken, setUserToken] =  useState(localStorage.getItem('accessToken'))
    const [toast, setToast] = useState({  message: '', show: false,})
    const setToken = (token) => {
        if(token){
            localStorage.setItem("accessToken", token);
        } else {
            localStorage.removeItem('accessToken')
        }
        setUserToken(token)
    }
    const showToast = (message) => {
        setToast({show: true, message: message })

        setInterval(() => {
            setToast({show: false, message: '' })
        }, 4000);
    }

    return (
        <StateContext.Provider
        value={{ 
            currentUser,
            userToken,
            toast,
            setCurrentUser,
            setToken,
            showToast,
            setUserToken,
            setToast
        }}
        
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);