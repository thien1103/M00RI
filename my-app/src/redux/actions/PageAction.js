import { useDispatch } from "react-redux";
import { LOAD_COMPONENT } from "../types/PageType";

export const SHOW_LOADING = () => {
    dispatch = useDispatch();
    dispatch({
        type: LOAD_COMPONENT,
        data: {
            isLoading: true,
        },
    });
};

export const HIDE_LOADING = () => {
    dispatch = useDispatch();
    dispatch({
        type: LOAD_COMPONENT,
        data: {
            isLoading: true,
        },
    });
};
