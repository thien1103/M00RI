import { Form, Input } from "antd";
import { useFormik } from "formik";
import React, { memo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createCurriculumAction,
    getCurriculumsAction,
    updateCurriculumAction,
} from "../../../redux/actions/CurriculumAction";
import { LOAD_MODAL } from "../../../redux/types/ModalHOCType";

const SubCurriculumForm = memo(({ parent_id }) => {
    const { form } = useSelector((a) => a.CurriculumReducer);
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: form.id,
            name: form.name,
            parent_id,
        },
        onSubmit: (values) => {
            console.log(values.parent_id);
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            dispatch(
                values.id
                    ? updateCurriculumAction(formData, parent_id)
                    : createCurriculumAction(formData, parent_id)
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
            <Form>
                <Form.Item label="Name" required labelAlign="left">
                    <Input
                        placeholder="Name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        name="name"
                    />
                </Form.Item>
            </Form>
        </div>
    );
});

export default SubCurriculumForm;
