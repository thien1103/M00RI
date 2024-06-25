import { GENERATE_NEW_VERSION, GET_VERSIONS } from "../types/DataType";

const initialState = {
    versions: [],
    form: {
        name: "",
        newData: false,
        translatedByGoogle: false,
    },
};

export default (state = initialState, { type, data }) => {
    switch (type) {
        case GET_VERSIONS: {
            state.versions = data;
            return { ...state };
        }
        case GENERATE_NEW_VERSION: {
            state.form.name = data;
            return { ...state };
        }
        default:
            return state;
    }
};
