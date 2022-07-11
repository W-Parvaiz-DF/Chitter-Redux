import axios from "axios";


//have a register function here later


const API_URL = 'http://localhost:4000'

const login = async (username, password) => {

    try {

        const response = await axios.post(`${API_URL}/signin`, {
            username,
            password,
        });

        const data = await response.data;
        console.log(data);

        if (data.accessToken) {

            localStorage.setItem(`user`, JSON.stringify(response.data));

        }

        return data;
    }
    catch (error) {
        return { error: error.response.data.message };
    }
};


const logout = () => {
    localStorage.removeItem(`user`);
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(`user`));
};

const authService = {
    //register,
    login,
    logout,
    getCurrentUser
};



export default authService;