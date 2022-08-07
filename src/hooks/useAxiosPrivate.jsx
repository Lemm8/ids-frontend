import { axiosPrivate } from "../api/api";

import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {

    const refresh = useRefreshToken();
    const { auth } = useAuth();

    // INTERCEPTORES DE REQUEST Y RESPONSE
    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if ( !config.headers['jwt-token'] ) {
                    config.headers['jwt-token'] = `${ auth?.accessToken }`
                }
                return config;
            }, ( error ) => Promise.reject( error )
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async ( error ) => {
                const prevRequest = error?.config;
                if ( error?.response?.status === 403 && !prevRequest?.sent ) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['x-token'] = `${ newAccessToken }`;
                    return axiosPrivate( prevRequest );
                }
                
            return Promise.reject( error );
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject( requestIntercept );
            axiosPrivate.interceptors.response.eject( responseIntercept );
        }

    }, [ auth, refresh ]);

    return axiosPrivate;

}

export default useAxiosPrivate;
