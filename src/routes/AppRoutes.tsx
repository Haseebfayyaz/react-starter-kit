import { Routes, Route } from "react-router-dom";
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Profile from '@/components/auth/Profile'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default AppRoutes;