// import { HIDE_LOADING, SHOW_LOADING } from "../redux/actions/PageAction";
import { LOAD_COMPONENT } from "../redux/types/PageType";
import {
    ACCESSTOKEN,
    DOMAIN,
    history,
    http,
    USER_LOGIN,
} from "../util/setting";
import { infoError, infoSuccess } from "./infoHelper";

export const apiGet = (url, type) => {
    return async (dispatch, getState) => {
        try {
            let result = await http.get(DOMAIN + url, {
                params: {
                    pageSize: 10,
                    page: getState().PageReducer.page,
                },
            });
            const total = result.data.data.total;
            if (result.data.data.items.length === 0 && getState().PageReducer.page > 1) {
                const page = total ? (total - (total % 10)) / 10 : getState().PageReducer.page;
                await dispatch({
                    type: LOAD_COMPONENT,
                    data: {
                        page: page,
                    },
                });
                result = await http.get(DOMAIN + url, {
                    params: {
                        pageSize: 10,
                        page: getState().PageReducer.page,
                    },
                });
            }
            dispatch({
                type: LOAD_COMPONENT,
                data: {
                    total: total,
                },
            });
            dispatch({
                type,
                data: result.data.data.items,
            });
        } catch (err) {
            if (err.response.status === 401) {
                infoError(
                    "Sorry!",
                    "You don't have permissions, please login again!",
                    () => {
                        localStorage.removeItem(USER_LOGIN);
                        localStorage.removeItem(ACCESSTOKEN);
                        history.replace("/admin/login");
                    }
                );
            } else {
                infoError(
                    "Sorry!",
                    err.response?.data.data
                        ? err.response?.data.data
                        : "An error occurred, please try again!"
                );
            }
        }
    };
};

export const apiGet2 = (url, type) => {
    return async (dispatch, getState) => {
        try {
            let result = await http.get(DOMAIN + url);
            dispatch({
                type,
                data: result.data.data,
            });
        } catch (err) {
            if (err.response.data?.message === "Unauthenticated.") {
                infoError(
                    "Sorry!",
                    "You don't have permissions, please login again!",
                    () => {
                        localStorage.removeItem(USER_LOGIN);
                        localStorage.removeItem(ACCESSTOKEN);
                        history.replace("/admin/login");
                    }
                );
            } else {
                infoError(
                    "Sorry!",
                    err.response?.data.data
                        ? err.response?.data.data
                        : "An error occurred, please try again!"
                );
            }
        }
    };
};

export const apiPost = (url, data = null, callback = null) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: LOAD_COMPONENT,
                data: {
                    isLoading: true,
                },
            });
            let result = await http.post(DOMAIN + url, data);
            infoSuccess("Success!", result.data.data);
            document.getElementById("closeModal").click();
            if (callback) {
                dispatch(callback());
            }
            dispatch({
                type: LOAD_COMPONENT,
                data: {
                    isLoading: false,
                },
            });
        } catch (err) {
            dispatch({
                type: LOAD_COMPONENT,
                data: {
                    isLoading: false,
                },
            });
            if (err.response?.data.data) {
                let message = "";
                let arr = err.response?.data.data;
                for (let key in arr) {
                    message = message + "\n" + arr[key];
                }
                infoError("Sorry", message);
            } else {
                infoError("Sorry!", "An error occurred, please try again!");
            }
        }
    };
};

export const apiPut = (url, data = null, callback = null) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: LOAD_COMPONENT,
                data: {
                    isLoading: true,
                },
            });
            let result = await http.put(DOMAIN + url, data);
            infoSuccess("Success!", result.data.data);
            document.getElementById("closeModal").click();
            if (callback) {
                dispatch(callback());
            }
            dispatch({
                type: LOAD_COMPONENT,
                data: {
                    isLoading: false,
                },
            });
        } catch (err) {
            dispatch({
                type: LOAD_COMPONENT,
                data: {
                    isLoading: false,
                },
            });
            if (err.response?.data.data) {
                let message = "";
                let arr = err.response?.data.data;
                for (let key in arr) {
                    message = message + "\n" + arr[key];
                }
                infoError("Sorry", message);
            } else {
                infoError("Sorry!", "An error occurred, please try again!");
            }
        }
    };
};

export const apiPost2 = (url, data = null, callback = null) => {
    return async (dispatch, getState) => {
        try {
            let result = await http.post(DOMAIN + url, data);
            if (callback) {
                callback(result.data.data, dispatch);
            }
        } catch (err) {
            infoError(
                "Sorry!",
                err.response?.data.data
                    ? err.response?.data.data
                    : "An error occurred, please try again!"
            );
        }
    };
};

export const apiDelete = (url, data, callback) => {
    return async (dispatch, getState) => {
        try {
            let result = await http.delete(DOMAIN + url, {
                data: {
                    items: data,
                },
            });
            infoSuccess(result.data.data);
            dispatch(callback());
        } catch (err) {
            infoError(
                "Sorry!",
                err.response?.data.data
                    ? err.response?.data.data
                    : "An error occurred, please try again!"
            );
        }
    };
};
