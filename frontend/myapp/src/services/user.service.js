//file currently not needed but might make things easier later

import axios from "axios";
import authHeader from './auth-header';

const API_URL = `http://localhost:4000/`;


const getUserBoard = () => {
    return axios.get(`${API_URL}/user`, { headers: authHeader() });
}

const getAdminBoard = () => {
    return axios.get(`${API_URL}/admin`, { headers: authHeader() });
}

//might add a public content for guest users in the future

const userService = {
    //getPublicContent,
    getUserBoard,
    //getModeratorBoard,
    getAdminBoard
};


export default userService;

