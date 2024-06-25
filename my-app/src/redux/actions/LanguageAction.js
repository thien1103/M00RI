import { apiGet } from "../../helpers/apiHelper";
import { GET_LANGUAGES } from "../types/LanguageType";

export const getLanguagesAction = () => {
    return apiGet("/languages", GET_LANGUAGES);
};

export const deleteLanguagesAction = (data) => {
    return apiDelete("/languges", data, getLanguagesAction);
};
