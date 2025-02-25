import axios from 'axios';

const api = process.env.REACT_APP_BASE_URL;

export const createAdminAccount = async (adminData) => {
    try {
        const response = await axios.post(`${api}/auth/admin/create-account`, adminData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Get token from localStorage
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


