import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";
import { useFormik } from "formik";
import { LOAD_MODAL } from "../../../redux/types/ModalHOCType";
import { savePostAction } from "../../../redux/actions/PostAction";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./PostForm.css";

const PostForm = memo((props) => {
    const { edit } = props;
    const { form } = useSelector((a) => a.PostReducer);
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: edit ? form.id : 0,
            name: edit ? form.name : "",
            content: edit ? form.content : "",
        },
        onSubmit: (values) => {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            dispatch(savePostAction(formData));
        },
    });
    useEffect(() => {
        dispatch({
            type: LOAD_MODAL,
            data: {
                handleSubmit: () => {
                    formik.handleSubmit();
                },
            },
        });
    }, []);
    const handleChangeTextarea = async (e) => {
        await formik.setFieldValue("content", e);
    };
    return (
        <div className="container">
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                size="large"
                onSubmitCapture={formik.handleSubmit}
            >
                <div className="row">
                    <div className="col">
                        <Form.Item
                            label="Version"
                            required
                            labelAlign="left"
                            className="justify-content-center"
                        >
                            <Input
                                placeholder="Version"
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Content"
                            required
                            labelAlign="left"
                            className="justify-content-center"
                        >
                            <ReactQuill
                                theme="snow"
                                value={formik.values.content}
                                onChange={handleChangeTextarea}
                            />
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    );
});
export default PostForm;
