import { Form, Input } from "antd";
import { useFormik } from "formik";
import React, { memo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createLessonAction,
    updateLessonAction,
} from "../../../redux/actions/LessonAction";
import { LOAD_MODAL } from "../../../redux/types/ModalHOCType";

const LessonForm = memo(({ level_id }) => {
    const { form } = useSelector((a) => a.LessonReducer);
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: form.id,
            name: form.name,
            index: form.index,
            level_id,
        },
        onSubmit: (values) => {
            dispatch(
                values.id
                    ? updateLessonAction(values, level_id)
                    : createLessonAction(values, level_id)
            );
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
    }, [form.id]);
    return (
        <div
            className="container"
            style={{
                marginTop: -35,
            }}
        >
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
            >
                <Form.Item label="Name" required labelAlign="left">
                    <Input
                        placeholder="Name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        name="name"
                    />
                </Form.Item>
                <Form.Item label="Lesson unit" required labelAlign="left">
                    <Input
                        placeholder="Lesson unit"
                        onChange={formik.handleChange}
                        value={formik.values.index}
                        name="index"
                    />
                </Form.Item>
            </Form>
        </div>
    );
});

export default LessonForm;
