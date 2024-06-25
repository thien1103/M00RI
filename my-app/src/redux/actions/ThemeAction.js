import { GET_THEME, SET_COLOR, SET_MODE } from "../types/ThemeType";

const setMode = (mode) => {
    return {
        type: SET_MODE,
        payload: mode,
    };
};

const setColor = (color) => {
    return {
        type: SET_COLOR,
        payload: color,
    };
};

const getTheme = () => {
    return {
        type: GET_THEME,
    };
};

const exportDefault = {
    setColor,
    setMode,
    getTheme,
};

export default exportDefault;
