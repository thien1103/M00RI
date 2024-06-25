import { GET_POST, POST_LIST } from "../types/PostType";

const stateDefault = {
    posts: [],
    form: {
        id: 0,
        name: "",
        content: "",
    },
};

export const PostReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case POST_LIST: {
            state.posts = action.data;
            return { ...state };
        }
        case GET_POST: {
            state.form = action.data;
            return { ...state };
        }
        default:
            return state;
    }
};
