import {Route,Redirect} from 'react-router-dom'

const PrivateRoute = ({children,...rest}) =>{
    console.log('private router is working..')
    return(
        <Route {...rest}>{children}</Route>
    )
}
export default PrivateRoute;