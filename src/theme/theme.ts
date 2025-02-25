import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#1a237e',
            light: '#534bae',
            dark: '#000051',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
        },
    },
    typography: {
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    color: '#111827',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.05)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    marginBottom: 4,
                },
            },
        },
    },
    shape: {
        borderRadius: 12,
    },
});
