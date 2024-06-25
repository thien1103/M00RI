import axios from "axios";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory({ window });
export const basename = "admin";
// export const DOMAIN = "http://woori.com/api/" + basename;
export const DOMAIN = "https://woori.smartidads.com/api/" + basename;

export const USER_LOGIN = "userLogin";
export const ACCESSTOKEN = "Authorization";

export const http = axios.create({
    baseURL: DOMAIN,
});

http.interceptors.request.use(
    (config) => {
        config.headers = {
            ...config.headers,
            [ACCESSTOKEN]: "Bearer " + localStorage.getItem(ACCESSTOKEN),
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
