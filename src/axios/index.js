import axios from 'axios'
import config from '../config'
import auth from '../store/auth';

const Axios = axios.create({
    baseURL : config.apiUrl,
    headers: {'Content-Type': 'application/json'},
});
Axios.interceptors.request.use (
    function (config) {
    const access_token = auth.getters.accessToken();
      if (access_token) config.headers.Authorization = access_token;
      return config;
    },
    function (error) {
      return Promise.reject (error);
    }
  );
export default Axios;
