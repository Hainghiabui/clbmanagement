import axios from 'axios';

const api = process.env.REACT_APP_BASE_URL;

export const loginService = async (credentials) => {
    try {
        const response = await axios.post(`${api}/auth/login`, credentials);
        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data;
        }
        throw new Error('Token not found in response');
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
