import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginAction } from "../../redux/actions/adminAction";
import { ACCESSTOKEN } from "../../util/setting";

const Input = ({ id, type, label, disabled }) => (
    <input
        className="form-group__input"
        type={type}
        id={id}
        placeholder={label}
        disabled={disabled}
    />
);

const modeDefault = "login";

export default function Login(props) {
    let [mode, setMode] = useState(modeDefault);
    if (localStorage.getItem(ACCESSTOKEN)) {
        return <Navigate to="/customers" />;
    }
    return (
        <div>
            <div className="background"></div>
            <div
                className={`form-block-wrapper form-block-wrapper--is-${mode}`}
            ></div>
            <section className={`form-block form-block--is-${mode}`}>
                <header className="form-block__header">
                    <h1>{mode === "login" ? "Welcome back!" : "Sign up"}</h1>
                </header>
                <LoginForm mode={mode} onSubmit={props.onSubmit} />
            </section>
        </div>
    );
}

const LoginForm = (props) => {
    let [values, setValues] = useState({
        username: "",
        password: "",
    });

    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginAction(values));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-block__input-wrapper">
                <div className="form-group form-group--login">
                    {/* <Input
                        type="text"
                        id="username"
                        label="Username"
                        disabled={props.mode === "signup"}
                    />
                    <Input
                        type="password"
                        id="password"
                        label="Password"
                        disabled={props.mode === "signup"}
                    /> */}
                    <input
                        className="form-group__input"
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={values.username}
                        onChange={handleInputChange}
                    />
                    <input
                        className="form-group__input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <button className="button button--primary full-width" type="submit">
                <b>{props.mode === "login" ? "Sign In" : "Sign Up"}</b>
            </button>
        </form>
    );
};
