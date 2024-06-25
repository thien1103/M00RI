import { GET_LANGUAGES } from "../types/LanguageType";

const initialState = {
    languages: [],
};

export const LanguageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LANGUAGES:
            state.languages = action.data;
            return { ...state };

        default:
            return state;
    }
};
