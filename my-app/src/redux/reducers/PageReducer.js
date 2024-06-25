import { LOAD_COMPONENT } from "../types/PageType";

const stateDefault = {
    title: "",
    buttons: [],
    columns: [],
    dataSource: [],
    selectedRowKeys: [],
    page: 1,
    total: 0,
    fetchData: () => {},
    isLoading: false,
};

export const PageReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LOAD_COMPONENT: {
            for (let key in action.data) {
                state[key] = action.data[key];
            }
            return { ...state };
        }
        default:
            return state;
    }
};
