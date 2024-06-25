import { GET_CURRICULUMN, GET_CURRICULUMNS } from "../types/CurriculumType";

const initialState = {
    curriculums: [],
    form: {
        id: null,
        name: "",
        description: "",
        detail: "",
        type: "",
        price: "",
        wallpaper: "",
        id_parent: null,
    },
};

export default (state = initialState, { type, data }) => {
    switch (type) {
        case GET_CURRICULUMNS:
            return { ...state, curriculums: data };
        case GET_CURRICULUMN:
            return { ...state, form: data };
        default:
            return state;
    }
};
