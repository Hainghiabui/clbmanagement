import React, { useState } from 'react';
import {
    Box, Grid, Typography, Card, Tabs, Tab, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Chip, Badge
} from '@mui/material';
import { Add, Edit, Delete, CheckCircle, Cancel, Visibility } from '@mui/icons-material';
import { ClubForm } from '../components/ClubForm';
import { PostApprovalList } from '../components/PostApprovalList';

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

export default function AdminDashboard() {
    const [ tabValue, setTabValue ] = useState(0);
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ dialogMode, setDialogMode ] = useState<'add' | 'edit'>('add');

    const mockClubs = [
        {
            id: 1,
            name: 'CLB Mỹ Thuật',
            leader: 'Nguyễn Văn A',
            members: 25,
            status: 'active',
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

    const handleAddClub = () => {
        setDialogMode('add');
        setOpenDialog(true);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Quản lý CLB
            </Typography>

            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
                <Tab label="Danh sách CLB" />
                <Tab
                    label="Phê duyệt bài đăng"
                    icon={<Badge badgeContent={mockPendingPosts.length} color="error" />}
                    iconPosition="end"
                />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleAddClub}
                        sx={{ borderRadius: 2 }}
                    >
                        Thêm CLB mới
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên CLB</TableCell>
                                <TableCell>Trưởng CLB</TableCell>
                                <TableCell align="center">Số thành viên</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockClubs.map((club) => (
                                <TableRow key={club.id}>
                                    <TableCell>{club.name}</TableCell>
                                    <TableCell>{club.leader}</TableCell>
                                    <TableCell align="center">{club.members}</TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={club.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                                            color={club.status === 'active' ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" size="small">
                                            <Visibility />
                                        </IconButton>
                                        <IconButton color="info" size="small">
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" size="small">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <PostApprovalList posts={mockPendingPosts} />
            </TabPanel>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
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
