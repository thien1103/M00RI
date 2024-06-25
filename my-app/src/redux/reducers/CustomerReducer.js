import { CUSTOMERS_LIST } from "../types/CustomerType";

const stateDefault = {
    customers: [],
};

export const CustomerReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case CUSTOMERS_LIST: {
            state.customers = action.data;
            return { ...state };
        }
        default:
            return state;
    }
};
