import React,{useContext} from 'react'
import AuthContext from '../context/AuthContext'

function LoginPage() {
  let {loginUser} = useContext(AuthContext)
  return (
    <div>
        <form onSubmit={loginUser}>
            <h1>login</h1>
            <input type="text" name="username" placeholder='Enter Username' />
            <input type="password" name="password" placeholder="Enter Password" />
            <input type="submit" />
        </form>
    </div>
  )
}

export default LoginPage