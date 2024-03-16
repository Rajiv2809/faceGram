import { createContext, useContext, useState } from "react";



const StateContext = createContext({
    currentUser: {},
    userToken: null,
    toast: {
        message: '',
        show: false,
    },
    posts: [],
    post_attachments : [],
    
    setPost_attachments: () => [],
    setPosts: () => [], 
    setCurrentUser: () => {},
    setUserToken: () => {},
    setToast: () => {},
    setToken: () => {},
    showToast: () => {}
   
})

export const ContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, setUserToken] =  useState(localStorage.getItem('accessToken'));
    const [toast, setToast] = useState({ message: '', show: false,});
    const [post_attachments, setPost_attachments] = useState([]);
    const [posts, setPosts] = useState([]);
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
            posts,
            setPosts,
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