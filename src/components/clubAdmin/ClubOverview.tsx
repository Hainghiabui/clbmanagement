import React from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { colors } from '../../theme/colors';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ClubOverviewProps {
    clubId: string;
}

export default function ClubOverview({ clubId }: ClubOverviewProps) {
    // Mock data for charts
    const membershipData = {
        labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun' ],
        datasets: [ {
            label: 'Số lượng thành viên',
            data: [ 20, 23, 25, 27, 28, 30 ],
            borderColor: colors.primary.main,
            tension: 0.4
        } ]
    };

    const activityData = {
        labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun' ],
        datasets: [ {
            label: 'Hoạt động',
            data: [ 5, 7, 4, 8, 6, 9 ],
            borderColor: colors.status.success,
            tension: 0.4
        } ]
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3 }}>Tổng quan CLB</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>Xu hướng thành viên</Typography>
                            <Line data={membershipData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>Hoạt động CLB</Typography>
                            <Line data={activityData} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
