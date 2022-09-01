import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

import LoadingSpinner from "./LoadingSpinner";

const PersistLogin = () => {
    const [ isLoading, setIsLoading ] = useState( true );
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect( () => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch ( error ) {
                console.error( error );
            }
            finally {
                isMounted && setIsLoading( false );
            }
        }

        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading( false );        

        return () => isMounted = false;

    }, []);

    useEffect( () => {
        console.log( `isLoading: ${ isLoading }` );
        console.log( `accessToken: ${ JSON.stringify( auth?.accessToken ) }` );
    }, [ isLoading ])

    return (
        <>
            { !persist
                ? <Outlet />
                : isLoading
                    ? <div> <h3>Espere unos segundos...</h3> <LoadingSpinner /> </div>
                    : <Outlet /> }
        </>
    )

}

export default PersistLogin;
