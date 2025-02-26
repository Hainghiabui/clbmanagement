import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { colors } from '../../theme/colors';
import { deleteClub, getDetailClub, getMyClubs } from '../../services/clubService';
import { getActivitiesInClub } from '../../services/activityService';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

export default function ClubOverview() {
    const [clubs, setClubs] = useState<any[]>([]);
    const [clubMembersCount, setClubMembersCount] = useState<Record<number, number>>({});
    const [activitysCount, setActivitysCount] = useState<Record<number, number>>({});

    const fetchMyClubs = async () => {
        try {
            const response = await getMyClubs();
            setClubs(response.data.content || []);
        } catch (error) {
            console.error("Error fetching clubs:", error);
            setClubs([]);
        }
    };

    const fetchClubDetails = async (clubId: number) => {
        try {
            const response = await getDetailClub(clubId);
            const response2 = await getActivitiesInClub(clubId, '', 0, 1000);
            const memberCount = response.data.membership?.length || 0;
            const activityCount = response2.data.content.length || 0;
            
            // Cập nhật state với số lượng thành viên của club
            setClubMembersCount(prev => ({
                ...prev,
                [clubId]: memberCount
            }));

            // Cập nhật state với số lượng hoạt động của club
            setActivitysCount(prev => ({
                ...prev,
                [clubId]: activityCount
            }));
        } catch (error) {
            console.error(`Error fetching details for club ${clubId}:`, error);
        }
    };

    const handleDeleteClub = (clubId: number) => {
        Swal.fire({
            title: 'Xác nhận xóa nhóm?',
            text: 'Hành động này không thể hoàn tác',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: colors.status.error,
            cancelButtonColor: colors.status.info,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteClub(clubId);
                    await fetchMyClubs();
                    toast.success('Đã xóa nhóm');
                } catch (error) {
                    console.error('Error deleting activity:', error);
                    toast.error('Đã có lỗi xảy ra khi xóa nhóm');
                }
            }
        });
    }

    useEffect(() => {
        fetchMyClubs();
    }, []);

    // Khi danh sách clubs thay đổi, fetch chi tiết cho mỗi club
    useEffect(() => {
        clubs.forEach(club => {
            if (club && club.id) {
                fetchClubDetails(club.id);
            }
        });
    }, [clubs]);

    return (
        clubs.length > 0 ? (
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ px: 3, py: 1, mb: 3 }}
                >
                    Thêm CLB
                </Button>
                {                    
                    clubs.map((club: any) => (
                        <Box key={club.id} sx={{ mb: 5 }}>
                            <Box>
                                <Typography variant="h5" sx={{ mb: 3 }}>Tổng quan CLB {club.name}</Typography>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ mb: 2 }}>Thông tin thành viên</Typography>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                <strong>Số thành viên:</strong> {clubMembersCount[club.id] ?? 'Đang tải...'}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ mb: 2 }}>Thông tin hoạt động</Typography>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                <strong>Số hoạt động:</strong> {activitysCount[club.id] ?? 'Đang tải...'}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ px: 3, py: 1 }}
                                    onClick={() => handleDeleteClub(club.id)}
                                >
                                    Xóa CLB
                                </Button>
                            </Box>
                            <ToastContainer />
                        </Box>
                    ))
                }
            </Box>) : (
            <Card sx={{ p: 4, textAlign: 'center' }}>
                <CardContent>
                    <Typography variant="h6">
                        Vui lòng chọn CLB để xem thông tin chi tiết
                    </Typography>
                </CardContent>
            </Card>
        )
    );
}