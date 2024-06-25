import React from "react";
import ReactDOM from "react-dom";
import {
    unstable_HistoryRouter as HistoryRouter,
    Routes,
    Route,
} from "react-router-dom";

// Config base
import reportWebVitals from "../reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import "../assets/boxicons-2.0.7/css/boxicons.min.css";
import "../assets/css/grid.css";
import "../assets/css/theme.css";
import "../assets/css/index.css";

// Config route
import AdminTemplate from "../templates/Admin/AdminTemplate";
import routes from "../templates/routes";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { basename, history } from "../util/setting";
import Login from "../pages/Admin/Login";

// Config redux
import { Provider } from "react-redux";
import { store } from "../redux/configStore";
import ModalHOC from "./ModalHOC/ModalHOC";
import Loading from "./loading/Loading";

function MyApp() {
    return (
        <HistoryRouter history={history} basename={basename}>
            <Loading />
            <Routes>
                <Route path="/login" element={<Login />} />
                {routes.map((item, index) => {
                    return (
                        <Route
                            key={index}
                            path={item.path}
                            element={
                                <AdminTemplate component={item.component} />
                            }
                        />
                    );
                })}
                <Route path="/about" exact element={<About />} />
                <Route path="/contact" exact element={<Contact />} />
            </Routes>
            <ModalHOC />
        </HistoryRouter>
    );
}
export default MyApp;
if (document.getElementById("root")) {
    ReactDOM.render(
        <Provider store={store}>
            <MyApp />
        </Provider>,
        document.getElementById("root")
    );
}
