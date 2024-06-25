import { GET_LESSON, GET_LESSONS } from "../types/LessonType";

const initialState = {
    lessons: [],
    form: {
        id: null,
        name: "",
        index: "",
        // description: "",
        // detail: "",
        // type: "",
        // price: "",
        // wallpaper: "",
        // id_parent: null,
    },
};

export default (state = initialState, { type, data }) => {
    switch (type) {
        case GET_LESSONS:
            return { ...state, lessons: data };
        case GET_LESSON:
            return { ...state, form: data };
        default:
            return state;
    }
};
