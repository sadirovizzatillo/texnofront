import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:4000/api",
    timeout: 10000,
    headers: {  
        "Content-Type": "application/json",
    },
});
function getLocalAccessToken() {
    const accessToken = window.localStorage.getItem("accessToken")
    return accessToken;
}
function getLocalRefreshToken() {
    const refreshToken = window.localStorage.getItem("refreshToken");
    return refreshToken;
}
function refreshToken() {
    return api.post("/auth/refreshtoken", {
        refreshToken: getLocalRefreshToken(),
    });
}


api.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        if (token) {
            config.headers["x-auth-token"] = token;
        }
        // Do something before request is sent
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    });
    
    
    api.interceptors.response.use(
        (res) => {
            if (res.config.crossOrigin) {
                res.headers.set('Set-Cookie', `SameSite=Strict`);
            } 
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            
            if (err.response) {
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    
                    try {
                        const rs = await refreshToken();
                        const { accessToken } = rs.data;
                        window.localStorage.setItem("accessToken", accessToken);
                        api.defaults.headers.common["x-auth-token"] = accessToken;
                        
                        return api(originalConfig);
                    } catch (_error) {
                        if (_error.response && _error.response.data) {
                            return Promise.reject(_error.response.data);
                        }
                        
                        return Promise.reject(_error);
                    }
                }
                
                if (err.response.status === 403 && err.response.data) {
                    return Promise.reject(err.response.data);
                }
            }
            
            return Promise.reject(err);
        }
        );
        
        
        export default api