import { apiDelete, apiGet, apiGet2, apiPost } from "../../helpers/apiHelper";
import { GET_CURRICULUMN, GET_CURRICULUMNS } from "../types/CurriculumType";

export const getCurriculumsAction = (parent_id = "") => {
    return apiGet("/curriculums?parent_id=" + parent_id, GET_CURRICULUMNS);
};

export const getCurriculumAction = (curriculum_id) => {
    return apiGet2(
        "/curriculum?curriculum_id=" + curriculum_id,
        GET_CURRICULUMN
    );
};

export const createCurriculumAction = (data, parent_id = "") => {
    return apiPost("/curriculum", data, () => {
        return getCurriculumsAction(parent_id);
    });
};

export const updateCurriculumAction = (data, parent_id = "") => {
    return apiPost("/curriculum/update", data, () => {
        return getCurriculumsAction(parent_id);
    });
};

export const deleteCurriculumsAction = (data, parent_id = "") => {
    return apiDelete("/curriculums", data, () => {
        return getCurriculumsAction(parent_id);
    });
};
