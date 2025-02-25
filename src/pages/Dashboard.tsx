import React from 'react';
import { Grid, Card, Typography, Box, Button, List, ListItem, ListItemText, Fade, useTheme, Avatar } from '@mui/material';
import { People, Event, Group, Assessment, Add, Schedule, BarChart } from '@mui/icons-material';
import { StatCard } from '../components/StatCard';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const theme = useTheme();
    const navigate = useNavigate();
    const recentActivities = [
        { id: 1, text: 'New member joined Art Club', date: '2 hours ago' },
        { id: 2, text: 'Chess Club meeting scheduled', date: '5 hours ago' },
        { id: 3, text: 'Drama Club updated their info', date: 'Yesterday' },
    ];

    return (
        <Box>
            {/* Header Section */}
            <Box
                sx={{
                    p: 4,
                    background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                    color: 'white',
                    borderRadius: '0 0 2rem 2rem',
                    mb: 4,
                }}
            >
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" fontWeight="bold">Welcome Back, Admin</Typography>
                        <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.8 }}>
                            Here's what's happening with your clubs today.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                sx={{
                                    backgroundColor: 'white',
                                    color: '#1a237e',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                                }}
                            >
                                New Club
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: 'white',
                                    color: 'white',
                                    '&:hover': { borderColor: 'rgba(255,255,255,0.9)' },
                                }}
                            >
                                Generate Report
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Main Content */}
            <Box sx={{ px: 4, pb: 4 }}>
                <Grid container spacing={4}>
                    {/* Stats Section */}
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Fade in timeout={1000}>
                                    <Box>
                                        <StatCard
                                            title="Total Students"
                                            value="450"
                                            icon={<People />}
                                            trend={5.2}
                                            color={theme.palette.primary.main}
                                        />
                                    </Box>
                                </Fade>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Fade in timeout={1000}>
                                    <Box>
                                        <StatCard
                                            title="Active Clubs"
                                            value="15"
                                            icon={<Group />}
                                            trend={3.1}
                                            color={theme.palette.secondary.main}
                                            onClick={() => navigate('/clubs')}
                                        />
                                    </Box>
                                </Fade>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Fade in timeout={1000}>
                                    <Box>
                                        <StatCard
                                            title="Upcoming Events"
                                            value="8"
                                            icon={<Event />}
                                            trend={2.4}
                                            color={theme.palette.success.main}
                                        />
                                    </Box>
                                </Fade>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Fade in timeout={1000}>
                                    <Box>
                                        <StatCard
                                            title="Total Activities"
                                            value="124"
                                            icon={<Assessment />}
                                            trend={1.8}
                                            color={theme.palette.warning.main}
                                        />
                                    </Box>
                                </Fade>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Activities and Calendar Section */}
                    <Grid item xs={12} lg={8}>
                        <Card
                            sx={{
                                p: 3,
                                height: '100%',
                                background: 'white',
                                borderRadius: 4,
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Recent Activities
                            </Typography>
                            <List>
                                {recentActivities.map((activity, index) => (
                                    <ListItem
                                        key={activity.id}
                                        sx={{
                                            borderRadius: 2,
                                            mb: 2,
                                            backgroundColor: '#f8f9ff',
                                            '&:hover': {
                                                transform: 'translateX(8px)',
                                                transition: 'all 0.2s ease',
                                            },
                                        }}
                                    >
                                        <Avatar sx={{ mr: 2, backgroundColor: '#1a237e' }}>
                                            {activity.text[ 0 ]}
                                        </Avatar>
                                        <ListItemText
                                            primary={activity.text}
                                            secondary={activity.date}
                                            primaryTypographyProps={{ fontWeight: 500 }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Card>
                    </Grid>

                    {/* Quick Actions Section */}
                    <Grid item xs={12} lg={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Card
                                    sx={{
                                        p: 3,
                                        background: 'white',
                                        borderRadius: 4,
                                    }}
                                >
                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                        Quick Actions
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {[ { icon: <Add />, text: 'Add New Club', color: 'primary' as 'primary' },
                                        { icon: <Schedule />, text: 'Schedule Event', color: 'secondary' as 'secondary' },
                                        { icon: <BarChart />, text: 'Generate Report', color: 'info' as 'info' },
                                        ].map((action, index) => (
                                            <Button
                                                key={action.text}
                                                variant="contained"
                                                color={action.color}
                                                startIcon={action.icon}
                                                sx={{
                                                    py: 1.5,
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    '&::after': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        background: 'linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0))',
                                                        top: 0,
                                                        left: '-100%',
                                                        transition: 'all 0.3s ease',
                                                    },
                                                    '&:hover::after': {
                                                        left: '100%',
                                                    },
                                                }}
                                            >
                                                {action.text}
                                            </Button>
                                        ))}
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card
                                    sx={{
                                        p: 3,
                                        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                                        color: 'white',
                                        borderRadius: 4,
                                    }}
                                >
                                    <Typography variant="h6" sx={{ mb: 2 }}>Active Users</Typography>
                                    <Typography variant="h3" sx={{ mb: 2 }}>2,847</Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        +18% from last month
                                    </Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
