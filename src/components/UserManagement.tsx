import React, { useState, useEffect } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    TextField,
    InputAdornment,
    Pagination,
    Stack,
    Card,
    Typography,
} from '@mui/material';
import { Edit, Delete, Search, Block } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { colors } from '../theme/colors';
import axiosInstance from '../api/axiosConfig';
import { User, UsersResponse } from '../types/user';
import LoadingSpinner from './LoadingSpinner';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const UserManagement = () => {
    const [ users, setUsers ] = useState<User[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ error, setError ] = useState<string | null>(null);
    const [ page, setPage ] = useState(0);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ pageSize ] = useState(5);

    useEffect(() => {
        fetchUsers();
    }, [ page ]);

    const fetchUsers = async (pageNumber = page) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get<UsersResponse>(
                `/auth/admin/get-all-users?page=${pageNumber}&size=${pageSize}`
            );
            setUsers(response.data.content);
            setTotalPages(response.data.totalPages);
            setError(null);
        } catch (err) {
            setError('Failed to fetch users');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <Box sx={{ color: 'error.main', p: 2 }}>{error}</Box>;

    return (
        <Stack spacing={3}>
            {/* Header Section */}
            <Card sx={{
                p: 2,
                background: colors.background.glassy,
                borderRadius: 2,
                boxShadow: colors.shadow.card,
            }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" sx={{ color: colors.text.primary }}>
                        Danh Sách Người Dùng
                    </Typography>
                    <TextField
                        size="small"
                        placeholder="Tìm kiếm người dùng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            width: 300,
                            '& .MuiOutlinedInput-root': {
                                background: colors.background.paper,
                                '& fieldset': { borderColor: colors.border.light },
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: colors.text.secondary }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
            </Card>

            {/* Table Section */}
            <Card sx={{
                background: colors.background.paper,
                borderRadius: 2,
                boxShadow: colors.shadow.card,
                overflow: 'hidden'
            }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                background: colors.background.darker,
                                '& th': {
                                    color: colors.text.primary,
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    py: 2
                                }
                            }}>
                                <TableCell>Tên</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Vai trò</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell align="right">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map((user, index) => (
                                <TableRow
                                    key={user.id}
                                    sx={{
                                        animation: `${fadeIn} 0.5s ease-out`,
                                        animationDelay: `${index * 0.1}s`,
                                        '&:hover': {
                                            background: colors.background.darker,
                                        }
                                    }}
                                >
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={user.roles}
                                            color={user.roles === 'admin' ? 'primary' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={user.enabled ? 'Hoạt động' : 'Đã khóa'}
                                            color={user.enabled ? 'success' : 'error'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    color: colors.primary.main,
                                                    '&:hover': { background: colors.primary.main + '10' }
                                                }}
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    color: colors.status.warning,
                                                    '&:hover': { background: colors.status.warning + '10' }
                                                }}
                                            >
                                                <Block />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    color: colors.status.error,
                                                    '&:hover': { background: colors.status.error + '10' }
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination Section */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        px: 3,
                        py: 2,
                        borderTop: `1px solid ${colors.border.light}`,
                        background: colors.background.darker
                    }}
                >
                    <Typography variant="body2" color={colors.text.secondary}>
                        Hiển thị {filteredUsers.length} trên tổng số {totalPages * pageSize} người dùng
                    </Typography>
                    <Pagination
                        count={totalPages}
                        page={page + 1}
                        onChange={handlePageChange}
                        color="primary"
                        size="small"
                        showFirstButton
                        showLastButton
                        sx={{
                            '& .MuiPaginationItem-root': {
                                backgroundColor: colors.background.paper,
                                '&.Mui-selected': {
                                    backgroundColor: colors.primary.main,
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: colors.primary.dark,
                                    }
                                }
                            }
                        }}
                    />
                </Stack>
            </Card>
        </Stack>
    );
};

export default UserManagement;
