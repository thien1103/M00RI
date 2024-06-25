import {
    apiDelete,
    apiGet,
    apiGet2,
    apiPost,
    apiPut,
} from "../../helpers/apiHelper";
import { GET_LESSON, GET_LESSONS } from "../types/LessonType";

export const getLessonsAction = (level_id = "") => {
    return apiGet("/lessons?level_id=" + level_id, GET_LESSONS);
};

export const getLessonAction = (lesson_id) => {
    return apiGet2("/lesson?lesson_id=" + lesson_id, GET_LESSON);
};

export const createLessonAction = (data, level_id = "") => {
    return apiPost("/lesson", data, () => {
        return getLessonsAction(level_id);
    });
};

export const updateLessonAction = (data, level_id = "") => {
    return apiPut("/lesson", data, () => {
        return getLessonsAction(level_id);
    });
};

export const deleteLessonsAction = (data, level_id = "") => {
    return apiDelete("/lessons", data, () => {
        return getLessonsAction(level_id);
    });
};

export const importVocabularyAction = (data) => {
    return apiPost("/import-lesson-vocabulary", data);
};

export const importFlashCardAction = (data) => {
    return apiPost("/import-lesson-flash-card", data);
};
