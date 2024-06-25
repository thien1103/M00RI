import { LOAD_MODAL } from "../types/ModalHOCType";

const initialState = {
    titleModal: "",
    maxWidth: 60,
    component: <></>,
    handleSubmit: () => {},
};

export const ModalHOCReducer = (state = initialState, { type, data }) => {
    switch (type) {
        case LOAD_MODAL: {
            for (const key in data) {
                if(data[key]) {
                    state[key] = data[key];
                }
            }
            return {...state}
        }
        default:
            return state;
    }
};
