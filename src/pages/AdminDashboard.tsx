import React, { useState } from 'react';
import {
    Box, Grid, Typography, Card, Tabs, Tab, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Chip, Badge
} from '@mui/material';
import { Add, Edit, Delete, CheckCircle, Cancel, Visibility, People, Groups, EventNote, BarChart, Assignment, Event, Article, Search } from '@mui/icons-material';
import { ClubForm } from '../components/ClubForm';
import { PostApprovalList } from '../components/PostApprovalList';
import StatisticsCard from '../components/StatisticsCard';
import UserManagement from '../components/UserManagement';
import { keyframes } from '@emotion/react';
import { colors } from '../theme/colors';
import { ClubActivityChart } from '../components/dashboard/ClubActivityChart';
import { MembershipTrendChart } from '../components/dashboard/MembershipTrendChart';
import { EventStatusPieChart } from '../components/dashboard/EventStatusPieChart';
import { ActiveEventsList } from '../components/dashboard/ActiveEventsList';
import { PostManagement } from '../components/dashboard/PostManagement';
import { TextField, InputAdornment } from '@mui/material';

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <Box role="tabpanel" hidden={value !== index} {...other} sx={{ py: 3 }}>
            {value === index && children}
        </Box>
    );
}

interface DashboardStats {
    totalUsers: number;
    totalClubs: number;
    activeEvents: number;
    totalPosts: number;
}

export default function AdminDashboard() {
    const [ tabValue, setTabValue ] = useState(0);
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ dialogMode, setDialogMode ] = useState<'add' | 'edit'>('add');
    const [ searchQuery, setSearchQuery ] = useState('');

    const mockClubs = [
        {
            id: 1,
            name: 'CLB Mỹ Thuật',
            leader: 'Nguyễn Văn A',
            members: 25,
        },
        {
            id: 2,
            name: 'CLB Âm Nhạc',
            leader: 'Trần Thị B',
            members: 30,
        },
        {
            id: 3,
            name: 'CLB Thể Thao',
            leader: 'Lê Văn C',
            members: 45,
        },
        // Add more mock data...
    ];

    const mockPendingPosts = [
        {
            id: 1,
            clubName: 'CLB Mỹ Thuật',
            title: 'Triển lãm cuối năm',
            status: 'pending',
            date: '2023-12-15',
        },
        // Add more mock data...
    ];

    const mockStats: DashboardStats = {
        totalUsers: 150,
        totalClubs: 12,
        activeEvents: 8,
        totalPosts: 45,
    };

    const filteredClubs = mockClubs.filter(club =>
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.leader.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddClub = () => {
        setDialogMode('add');
        setOpenDialog(true);
    };

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            minHeight: '100vh',
            background: colors.background.gradient
        }}>
            {/* Sidebar */}
            <Box sx={{
                background: colors.background.glassy,
                borderRight: `2px solid ${colors.border.light}`,
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                boxShadow: colors.shadow.card,
                '& .MuiTab-root': {
                    color: colors.text.secondary,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': {
                        background: colors.primary.gradient,
                        color: '#fff',
                        boxShadow: colors.shadow.card
                    },
                    '&:hover:not(.Mui-selected)': {
                        background: colors.background.darker,
                        color: colors.text.accent
                    }
                }
            }}>
                <Typography variant="h5" sx={{
                    color: colors.text.primary,
                    fontWeight: 'bold',
                    mb: 4,
                    textAlign: 'center'
                }}>
                    Bảng điều khiển Admin
                </Typography>

                <Tabs
                    orientation="vertical"
                    value={tabValue}
                    onChange={(e, newValue) => setTabValue(newValue)}
                    sx={{
                        '& .MuiTab-root': {
                            alignItems: 'flex-start',
                            color: colors.text.secondary,
                            textAlign: 'left',
                            textTransform: 'none',
                            fontSize: '1rem',
                            minHeight: 48,
                            borderRadius: 1,
                            mb: 1,
                            '&.Mui-selected': {
                                color: colors.primary.main,
                                background: colors.primary.main + '10',
                            }
                        }
                    }}
                >
                    <Tab icon={<BarChart />} label="Thống kê" iconPosition="start" />
                    <Tab icon={<People />} label="Quản lý người dùng" iconPosition="start" />
                    <Tab icon={<Groups />} label="Quản lý CLB" iconPosition="start" />
                    <Tab icon={<Event />} label="Sự kiện đang diễn ra" iconPosition="start" />
                    <Tab icon={<Article />} label="Quản lý bài đăng" iconPosition="start" />
                </Tabs>
            </Box>

            {/* Main Content */}
            <Box sx={{
                p: 4,
                overflow: 'auto',
                '& .MuiCard-root': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: colors.shadow.hover
                    }
                }
            }}>
                {/* <Typography variant="h4" sx={{
                    mb: 4,
                    fontWeight: 'bold',
                    color: colors.text.light,
                }}>
                    Bảng điều khiển Admin
                </Typography> */}

                {/* Statistics Grid */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatisticsCard
                            title="Tổng số người dùng"
                            value={mockStats.totalUsers}
                            icon={People}
                            color={colors.status.info}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatisticsCard
                            title="Tổng số CLB"
                            value={mockStats.totalClubs}
                            icon={Groups}
                            color="#4caf50"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatisticsCard
                            title="Sự kiện đang diễn ra"
                            value={mockStats.activeEvents}
                            icon={EventNote}
                            color="#ff9800"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatisticsCard
                            title="Tổng số bài đăng"
                            value={mockStats.totalPosts}
                            icon={Assignment}
                            color="#f44336"
                        />
                    </Grid>
                </Grid>

                {/* Tab Panels with new styling */}
                <Box sx={{
                    background: colors.background.paper,
                    borderRadius: 3,
                    p: 3,
                    minHeight: 400,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: `1px solid ${colors.border.light}`,
                }}>
                    <TabPanel value={tabValue} index={0}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <ClubActivityChart />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <EventStatusPieChart />
                            </Grid>
                            <Grid item xs={12}>
                                <MembershipTrendChart />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <UserManagement />
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        <Box sx={{
                            mb: 3,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            <TextField
                                placeholder="Tìm kiếm CLB hoặc trưởng CLB..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                sx={{ flex: 1 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={handleAddClub}
                                sx={{ borderRadius: 2, minWidth: 'fit-content' }}
                            >
                                Thêm CLB mới
                            </Button>
                        </Box>

                        <TableContainer
                            component={Paper}
                            sx={{
                                borderRadius: 2,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tên CLB</TableCell>
                                        <TableCell>Trưởng CLB</TableCell>
                                        <TableCell align="center">Số thành viên</TableCell>
                                        <TableCell align="center">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredClubs.map((club) => (
                                        <TableRow
                                            key={club.id}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                }
                                            }}
                                        >
                                            <TableCell>{club.name}</TableCell>
                                            <TableCell>{club.leader}</TableCell>
                                            <TableCell align="center">{club.members}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    color="primary"
                                                    size="small"
                                                    sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                                                >
                                                    <Visibility />
                                                </IconButton>
                                                <IconButton
                                                    color="info"
                                                    size="small"
                                                    sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    size="small"
                                                    sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel value={tabValue} index={3}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h5" sx={{ color: colors.text.primary, fontWeight: 600 }}>
                                Sự kiện đang diễn ra
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                                Quản lý và theo dõi các sự kiện đang và sắp diễn ra
                            </Typography>
                        </Box>
                        <ActiveEventsList />
                    </TabPanel>
                    <TabPanel value={tabValue} index={4}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h5" sx={{ color: colors.text.primary, fontWeight: 600 }}>
                                Quản lý bài đăng
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                                Xem và quản lý tất cả bài đăng trong hệ thống
                            </Typography>
                        </Box>
                        <PostManagement />
                    </TabPanel>
                </Box>
            </Box>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
                    }
                }}
            >
                <DialogTitle>
                    {dialogMode === 'add' ? 'Thêm CLB mới' : 'Chỉnh sửa thông tin CLB'}
                </DialogTitle>
                <DialogContent>
                    <ClubForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
                    <Button variant="contained" onClick={() => setOpenDialog(false)}>
                        {dialogMode === 'add' ? 'Thêm' : 'Lưu thay đổi'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
