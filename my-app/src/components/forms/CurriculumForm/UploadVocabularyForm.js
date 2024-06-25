import { Button, Form, Upload } from "antd";
import { useFormik } from "formik";
import React, { memo, useEffect } from "react";
import { importVocabularyAction } from "../../../redux/actions/LessonAction";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { LOAD_MODAL } from "../../../redux/types/ModalHOCType";
import { useDispatch } from "react-redux";

const UploadVocabularyForm = memo(({ lesson_id }) => {
    const dispatch = useDispatch();

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

    const formik = useFormik({
        // enableReinitialize: true,
        initialValues: {
            data: null,
            lesson_id,
        },
        onSubmit: (values) => {
            let formData = new FormData();
            for (let key in values) {
                if (key === "data" && typeof values.data == "Bolb") {
                    formData.append(
                        key,
                        values[key].file,
                        values[key].file.name
                    );
                } else {
                    formData.append(key, values[key]);
                }
            }
            dispatch(importVocabularyAction(formData));
        },
    });

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(async () => {
            await formik.setFieldValue("data", file);
            onSuccess();
        }, 0);
    };

    return (
        <div className="container">
            <Form
                wrapperCol={{
                    span: 10,
                }}
                labelCol={{
                    span: 8,
                }}
                className="d-flex justify-content-center"
            >
                <Form.Item label="File import" required>
                    <Upload
                        name="files"
                        customRequest={dummyRequest}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>
        </div>
    );
});

export default UploadVocabularyForm;
