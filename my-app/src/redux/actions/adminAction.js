import { apiPost2 } from "../../helpers/apiHelper";
import { history } from "../../util/setting";
import { LOGIN, LOGOUT } from "../types/adminType";

export const loginAction = (data) => {
    return apiPost2("/login", data, (data, dispatch) => {
        dispatch({ type: LOGIN, data });
        history.replace("/admin/customers");
    });
};

export const logoutAction = () => {
    return async (dispatch) => {
        dispatch({
            type: LOGOUT,
        });
        history.replace("/admin/logout");
    };
};
