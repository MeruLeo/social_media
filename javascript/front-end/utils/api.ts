import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8001/v1",
    withCredentials: true,
});

export default axiosInstance;
