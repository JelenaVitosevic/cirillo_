import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {

    let isLoged = localStorage.getItem('access token')

    return isLoged ? <Outlet/> : <Navigate to='/login' />
}

export default ProtectedRoute;