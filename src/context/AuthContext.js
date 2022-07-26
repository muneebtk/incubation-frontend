import { createContext,useState,useEffect } from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{
    let [authTokens,setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user,setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    // let [loading,setLoading] = useState(true)
    let navigate = useNavigate()

    let loginUser = async (e)=>{
        e.preventDefault()
        let response = await( fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})

        }))
        let data =await(response).json()     
        if ((response).status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/')
        }else{
            alert('something went wrong')
        }
    }
    let logoutUser = () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens',authTokens.refresh)
        navigate('/login')
    }
    // let updateToken = async()=>{
    //     console.log('update token called')
    //     let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify('username')

    //     })
    //     let data =await(response).json()     

    //     if (response.status === 200){
    //         setAuthTokens(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authTokens',JSON.stringify(data))
    //     }
    //     else{
    //        logoutUser()
    //     }
    // }
    // useEffect(()=>{
    //     let interval=setInterval(()=>{
    //         if(authTokens){
    //             updateToken()
    //         }
    //     })
    //     return()=> clearInterval(interval)
    // },[authTokens,loading])

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}