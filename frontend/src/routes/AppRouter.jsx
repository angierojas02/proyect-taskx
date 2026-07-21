import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import Dashboard from '../pages/DashboardNotes'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to='/login' replace/>
    },
    {
        path:'/register',
        element: <RegisterPage/>
    },
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path:'/dashboard',
        element: <Dashboard/>
    }
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}