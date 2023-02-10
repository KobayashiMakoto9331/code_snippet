import Axios from "axios";

const axiosInstance = Axios.create({
    baseURL: 'api'
})

if (localStorage.token){
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
}

export default axiosInstance