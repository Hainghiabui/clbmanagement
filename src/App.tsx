import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router } from '@mui/icons-material';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateAdmin from './pages/CreateAdmin';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="createAdmin" element={<CreateAdmin />} />
                <Route path="dashboard" element={<Dashboard />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
