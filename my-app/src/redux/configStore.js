import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./reducers/adminReducer";
import ThemeReducer from "./reducers/ThemeReducer";
import { PageReducer } from "./reducers/PageReducer";
import { CustomerReducer } from "./reducers/CustomerReducer";
import { PostReducer } from "./reducers/PostReducer";
import DataReducer from "./reducers/DataReducer";
import { ModalHOCReducer } from "./reducers/ModalHOCReducer";
import CurriculumReducer from "./reducers/CurriculumReducer";
import LessonReducer from "./reducers/LessonReducer";

const rootReducer = combineReducers({
    adminReducer,
    ThemeReducer: ThemeReducer,
    PageReducer: PageReducer,
    CustomerReducer: CustomerReducer,
    PostReducer: PostReducer,
    LessonReducer,
    DataReducer: DataReducer,
    ModalHOCReducer: ModalHOCReducer,
    CurriculumReducer,
});

// export const store = createStore(rootReducer);

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
});
