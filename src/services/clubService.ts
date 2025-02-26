import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getMyClubs = async (keyword = '', page = 0, size = 10) => {
    return axios.get(`${BASE_URL}/clubs/private/my-clubs?page=${page}&size=${size}&keyword=${keyword}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
}

export const getDetailClub = async (clubId: number) => {
    return axios.get(`${BASE_URL}/clubs/public/${clubId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
}

export const deleteUserFromClub = async (id: number) => {
    return axios.delete(`${BASE_URL}/clubs/teacher/delete-membership/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
}

export const deleteClub = async (clubId: number) => {
    return axios.delete(`${BASE_URL}/clubs/teacher/delete/${clubId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
}

export const addMemberToClub = async (clubId: number, username: string) => {
    return axios.post(`${BASE_URL}/clubs/teacher/add-user/${clubId}/${username}`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
}

export const updateMemberShip = async (memberShipId: number, roleInClub: string, status: boolean) => {
    return axios.put(`${BASE_URL}/clubs/teacher/update-membership/${memberShipId}/${roleInClub}/${status}`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
}