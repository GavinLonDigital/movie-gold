import {axiosAuth} from '../api/movies';
import useAuth from "./useAuth";
import {useEffect} from "react";

const useAxiosPrivate = () => {
    const { auth } = useAuth();

    useEffect(()=>{
        const requestIntercept = axiosAuth.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;     
                }
                return config;

            },(error)=>{
                Promise.reject(error);
            }
        )
        return () => {

            axiosAuth.interceptors.request.eject(requestIntercept);

        }

    },[auth]);

    return axiosAuth;

}

export default useAxiosPrivate;