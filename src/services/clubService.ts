import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getMyClubs = async (keyword = '', page = 0, size = 10) => {
    return axios.get(`${BASE_URL}/clubs/private/my-clubs?page=${page}&size=${size}&keyword=${keyword}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
}

