import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    Box,
    Avatar,
    IconButton,
    Typography
} from '@mui/material';
import { PhotoCamera, Save } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface EditProfileDialogProps {
    open: boolean;
    onClose: () => void;
    userData: {
        name: string;
        email: string;
        phone: string;
        school: string;
        avatar: string;
    };
}

export const EditProfileDialog = ({ open, onClose, userData }: EditProfileDialogProps) => {
    const [ formData, setFormData ] = useState(userData);
    const [ avatarPreview, setAvatarPreview ] = useState(userData.avatar);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[ 0 ];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        // Handle form submission here
        console.log('Updated profile:', formData);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                component: motion.div,
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                sx: {
                    borderRadius: 3,
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                }
            }}
        >
            <DialogTitle>
                Chỉnh sửa hồ sơ
            </DialogTitle>
            <DialogContent>
                <Box sx={{ my: 2, textAlign: 'center' }}>
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Avatar
                            src={avatarPreview}
                            sx={{
                                width: 120,
                                height: 120,
                                border: '4px solid white',
                                boxShadow: '0 0 20px rgba(0,0,0,0.1)'
                            }}
                        />
                        <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                backgroundColor: 'primary.main',
                                color: 'white',
                                '&:hover': { backgroundColor: 'primary.dark' }
                            }}
                            component="label"
                        >
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <PhotoCamera fontSize="small" />
                        </IconButton>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        Nhấp vào biểu tượng máy ảnh để thay đổi ảnh đại diện
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Họ và tên"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Số điện thoại"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Trường"
                            value={formData.school}
                            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose}>
                    Hủy
                </Button>
                <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSubmit}
                >
                    Lưu thay đổi
                </Button>
            </DialogActions>
        </Dialog>
    );
};
