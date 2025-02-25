import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, useTheme, styled, ListItemButton } from '@mui/material';
import { Dashboard, People, Groups, Event, Settings, Menu, ChevronLeft } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 280;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    height: 64,
    justifyContent: 'space-between',
}));

const menuItems = [
    { text: 'Tổng quan', icon: <Dashboard />, path: '/' },
    { text: 'Học sinh', icon: <People />, path: '/students' },
    { text: 'Câu lạc bộ', icon: <Groups />, path: '/clubs' },
    { text: 'Sự kiện', icon: <Event />, path: '/events' },
    { text: 'Cài đặt', icon: <Settings />, path: '/settings' },
];

import { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [ open, setOpen ] = useState(true);
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: open ? DRAWER_WIDTH : theme.spacing(9),
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    '& .MuiDrawer-paper': {
                        width: open ? DRAWER_WIDTH : theme.spacing(9),
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        backgroundColor: '#1a237e',
                        color: 'white',
                        overflow: 'hidden',
                    },
                }}
            >
                <DrawerHeader>
                    {open && (
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            Câu Lạc Bộ Trường
                        </Typography>
                    )}
                    <IconButton onClick={() => setOpen(!open)} sx={{ color: 'white' }}>
                        {open ? <ChevronLeft /> : <Menu />}
                    </IconButton>
                </DrawerHeader>
                <List>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.text}
                            onClick={() => navigate(item.path)}
                            selected={location.pathname === item.path}
                            sx={{
                                py: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            {open && <ListItemText primary={item.text} />}
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 0,
                    backgroundColor: '#f5f7ff',
                    minHeight: '100vh',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
