import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://smart-q-flow-server.vercel.app'
})
const useAxios =()=>{
    return axiosInstance;
};

export default useAxios;