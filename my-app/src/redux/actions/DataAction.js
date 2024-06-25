import { apiGet, apiGet2, apiPost } from "../../helpers/apiHelper";
import { GENERATE_NEW_VERSION, GET_VERSIONS } from "../types/DataType";

export const getVersionsAction = () => {
    return apiGet("/versions", GET_VERSIONS);
};

export const generateNewNameAction = () => {
    return apiGet2("/generate", GENERATE_NEW_VERSION);
};

export const uploadVersionAction = (data) => {
    return apiPost("/version", data, getVersionsAction);
};
