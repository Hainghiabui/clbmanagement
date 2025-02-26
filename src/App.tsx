import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateAdmin from './pages/CreateAdmin';
import Dashboard from './pages/Dashboard';
import { ClubForm } from './components/ClubForm';
import DashboardLayout from './layouts/DashboardLayout';
import Clubs from './pages/Clubs';
import LoginAdmin from './pages/LoginAdmin';
import AdminDashboard from './pages/AdminDashboard';
import ClubAdminDashboard from './pages/ClubAdminDashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="dashboard-admin" element={<AdminDashboard />} />
                <Route path="clubs" element={<Clubs />} />
                {/* <Route path="/" element={<DashboardLayout children={undefined} />}>
                </Route> */}
                <Route path="/" element={<LoginAdmin />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="createAdmin" element={<CreateAdmin />} />
                <Route path="login-admin" element={<LoginAdmin />} />
                <Route path="dashboard" element={<ClubAdminDashboard />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
