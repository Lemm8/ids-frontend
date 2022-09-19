import axios from "../api/api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    
  const { setAuth } = useAuth();

  const refresh = async () => {

    const response = await axios.get(`/refresh`, {
      withCredentials: true
    });

    setAuth( prev => {
      return { 
        ...prev, 
        rol: response.data.rol,
        usuario: response.data.usuario,
        info: response.data.info,
        accessToken: response.data.token, 
      }
    });

    return response.res.token;

  }  

  return refresh;

}

export default useRefreshToken;
