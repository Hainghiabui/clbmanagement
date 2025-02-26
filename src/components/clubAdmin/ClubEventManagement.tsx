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
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { colors } from '../../theme/colors';

interface Event {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    maxParticipants: number;
    currentParticipants: number;
}

interface ClubEventManagementProps {
    clubId: string;
}

export default function ClubEventManagement({ clubId }: ClubEventManagementProps) {
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ dialogMode, setDialogMode ] = useState<'add' | 'edit'>('add');
    const [ selectedEvent, setSelectedEvent ] = useState<Event | null>(null);

    // Mock data
    const events: Event[] = [
        {
            id: '1',
            title: 'Triển lãm Nghệ thuật Xuân 2024',
            description: 'Triển lãm tác phẩm của các thành viên CLB',
            startDate: '2024-01-15',
            endDate: '2024-01-20',
            location: 'Sảnh A - Tòa nhà B',
            status: 'upcoming',
            maxParticipants: 100,
            currentParticipants: 45
        },
        {
            id: '2',
            title: 'Workshop Vẽ Màu Nước',
            description: 'Hướng dẫn kỹ thuật vẽ màu nước cơ bản',
            startDate: '2024-02-01',
            endDate: '2024-02-01',
            location: 'Phòng Workshop 2.1',
            status: 'ongoing',
            maxParticipants: 30,
            currentParticipants: 28
        },
    ];

    const getStatusColor = (status: Event[ 'status' ]) => {
        switch (status) {
            case 'upcoming':
                return colors.status.info;
            case 'ongoing':
                return colors.status.success;
            case 'completed':
                return colors.status.warning;
            case 'cancelled':
                return colors.status.error;
            default:
                return '#000000'; // or any other default color
        }
    };

    const getStatusLabel = (status: Event[ 'status' ]) => {
        switch (status) {
            case 'upcoming':
                return 'Sắp diễn ra';
            case 'ongoing':
                return 'Đang diễn ra';
            case 'completed':
                return 'Đã kết thúc';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    const handleAddEvent = () => {
        setDialogMode('add');
        setSelectedEvent(null);
        setOpenDialog(true);
    };

    const handleEditEvent = (event: Event) => {
        setDialogMode('edit');
        setSelectedEvent(event);
        setOpenDialog(true);
    };

    const handleDeleteEvent = (eventId: string) => {
        // Implement delete logic
        console.log('Delete event:', eventId);
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Quản lý sự kiện</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAddEvent}
                    sx={{ borderRadius: 2, background: colors.primary.gradient }}
                >
                    Thêm sự kiện
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ boxShadow: colors.shadow.card }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên sự kiện</TableCell>
                            <TableCell>Thời gian</TableCell>
                            <TableCell>Địa điểm</TableCell>
                            <TableCell>Số người tham gia</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="center">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>
                                    <Typography variant="body2" color="textSecondary">
                                        {event.startDate}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {event.endDate}
                                    </Typography>
                                </TableCell>
                                <TableCell>{event.location}</TableCell>
                                <TableCell>
                                    {event.currentParticipants}/{event.maxParticipants}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={getStatusLabel(event.status)}
                                        sx={{
                                            backgroundColor: getStatusColor(event.status) + '20',
                                            color: getStatusColor(event.status),
                                            fontWeight: 500
                                        }}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        size="small"
                                        onClick={() => console.log('View details')}
                                    >
                                        <Visibility />
                                    </IconButton>
                                    <IconButton
                                        color="info"
                                        size="small"
                                        onClick={() => handleEditEvent(event)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteEvent(event.id)}
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
                    {dialogMode === 'add' ? 'Thêm sự kiện mới' : 'Chỉnh sửa thông tin sự kiện'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                        <TextField
                            label="Tên sự kiện"
                            fullWidth
                            defaultValue={selectedEvent?.title}
                        />
                        <TextField
                            label="Mô tả"
                            fullWidth
                            multiline
                            rows={4}
                            defaultValue={selectedEvent?.description}
                        />
                        <TextField
                            label="Ngày bắt đầu"
                            type="date"
                            fullWidth
                            defaultValue={selectedEvent?.startDate}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Ngày kết thúc"
                            type="date"
                            fullWidth
                            defaultValue={selectedEvent?.endDate}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Địa điểm"
                            fullWidth
                            defaultValue={selectedEvent?.location}
                        />
                        <TextField
                            label="Số người tham gia tối đa"
                            type="number"
                            fullWidth
                            defaultValue={selectedEvent?.maxParticipants}
                        />
                        <TextField
                            select
                            label="Trạng thái"
                            fullWidth
                            defaultValue={selectedEvent?.status || 'upcoming'}
                        >
                            <MenuItem value="upcoming">Sắp diễn ra</MenuItem>
                            <MenuItem value="ongoing">Đang diễn ra</MenuItem>
                            <MenuItem value="completed">Đã kết thúc</MenuItem>
                            <MenuItem value="cancelled">Đã hủy</MenuItem>
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
