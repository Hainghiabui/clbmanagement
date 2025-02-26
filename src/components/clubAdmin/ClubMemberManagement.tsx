import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Chip
} from '@mui/material';
import { Add, Edit, Delete, Email } from '@mui/icons-material';
import { colors } from '../../theme/colors';

interface Member {
    id: string;
    name: string;
    studentId: string;
    email: string;
    role: 'member' | 'leader' | 'vice-leader';
    joinDate: string;
    status: 'active' | 'inactive';
}

interface ClubMemberManagementProps {
    clubId: string;
}

export default function ClubMemberManagement({ clubId }: ClubMemberManagementProps) {
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ dialogMode, setDialogMode ] = useState<'add' | 'edit'>('add');
    const [ selectedMember, setSelectedMember ] = useState<Member | null>(null);

    // Mock data
    const members: Member[] = [
        {
            id: '1',
            name: 'Nguyễn Văn A',
            studentId: 'SV001',
            email: 'vana@example.com',
            role: 'leader',
            joinDate: '2023-01-15',
            status: 'active'
        },
        {
            id: '2',
            name: 'Trần Thị B',
            studentId: 'SV002',
            email: 'thib@example.com',
            role: 'member',
            joinDate: '2023-02-20',
            status: 'active'
        },
        // Add more mock data as needed
    ];

    const handleAddMember = () => {
        setDialogMode('add');
        setSelectedMember(null);
        setOpenDialog(true);
    };

    const handleEditMember = (member: Member) => {
        setDialogMode('edit');
        setSelectedMember(member);
        setOpenDialog(true);
    };

    const handleDeleteMember = (memberId: string) => {
        // Implement delete logic
        console.log('Delete member:', memberId);
    };

    const getRoleColor = (role: Member[ 'role' ]) => {
        switch (role) {
            case 'leader':
                return colors.status.success;
            case 'vice-leader':
                return colors.status.warning;
            default:
                return colors.status.info;
        }
    };

    const getRoleLabel = (role: Member[ 'role' ]) => {
        switch (role) {
            case 'leader':
                return 'Trưởng CLB';
            case 'vice-leader':
                return 'Phó CLB';
            default:
                return 'Thành viên';
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Quản lý thành viên</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAddMember}
                    sx={{
                        borderRadius: 2,
                        background: colors.primary.gradient
                    }}
                >
                    Thêm thành viên
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ boxShadow: colors.shadow.card }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Họ và tên</TableCell>
                            <TableCell>MSSV</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Vai trò</TableCell>
                            <TableCell>Ngày tham gia</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="center">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.map((member) => (
                            <TableRow key={member.id}>
                                <TableCell>{member.name}</TableCell>
                                <TableCell>{member.studentId}</TableCell>
                                <TableCell>{member.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={getRoleLabel(member.role)}
                                        sx={{
                                            backgroundColor: getRoleColor(member.role) + '20',
                                            color: getRoleColor(member.role),
                                            fontWeight: 500
                                        }}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{member.joinDate}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={member.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                                        color={member.status === 'active' ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        size="small"
                                        onClick={() => window.location.href = `mailto:${member.email}`}
                                    >
                                        <Email />
                                    </IconButton>
                                    <IconButton
                                        color="info"
                                        size="small"
                                        onClick={() => handleEditMember(member)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteMember(member.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
                    }
                }}
            >
                <DialogTitle>
                    {dialogMode === 'add' ? 'Thêm thành viên mới' : 'Chỉnh sửa thông tin thành viên'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                        <TextField
                            label="Họ và tên"
                            fullWidth
                            defaultValue={selectedMember?.name}
                        />
                        <TextField
                            label="MSSV"
                            fullWidth
                            defaultValue={selectedMember?.studentId}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            type="email"
                            defaultValue={selectedMember?.email}
                        />
                        <TextField
                            select
                            label="Vai trò"
                            fullWidth
                            defaultValue={selectedMember?.role || 'member'}
                        >
                            <MenuItem value="member">Thành viên</MenuItem>
                            <MenuItem value="vice-leader">Phó CLB</MenuItem>
                            <MenuItem value="leader">Trưởng CLB</MenuItem>
                        </TextField>
                        <TextField
                            select
                            label="Trạng thái"
                            fullWidth
                            defaultValue={selectedMember?.status || 'active'}
                        >
                            <MenuItem value="active">Đang hoạt động</MenuItem>
                            <MenuItem value="inactive">Không hoạt động</MenuItem>
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
                    <Button
                        variant="contained"
                        onClick={() => setOpenDialog(false)}
                        sx={{ background: colors.primary.gradient }}
                    >
                        {dialogMode === 'add' ? 'Thêm' : 'Lưu thay đổi'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
