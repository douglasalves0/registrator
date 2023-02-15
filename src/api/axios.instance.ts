import axios from "axios";

const consumer = axios.create();

consumer.interceptors.response.use(
    function response(response: any){
        return response.data;
    },
    function error(error: any){
        console.log(error);
        return Promise.reject(error.response.data);
    }
);

export { consumer };