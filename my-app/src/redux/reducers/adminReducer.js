import { ACCESSTOKEN, USER_LOGIN } from "../../util/setting";
import { LOGIN, LOGOUT } from "../types/adminType";

let userLogin = "";
if (localStorage.getItem(USER_LOGIN)) {
    userLogin = localStorage.getItem(USER_LOGIN);
}

const stateDefault = {
    userLogin,
};

export const adminReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LOGIN: {
            let userLogin = action.data.name;
            let token = action.data.token;
            localStorage.setItem(USER_LOGIN, userLogin);
            localStorage.setItem(ACCESSTOKEN, token);
            state.userLogin = userLogin;
            return { ...state };
        }
        case LOGOUT: {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(ACCESSTOKEN);
            state.userLogin = "";
            return { ...state };
        }
        default:
            return state;
    }
};
