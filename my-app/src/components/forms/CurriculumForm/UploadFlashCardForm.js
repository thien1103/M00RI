import { Button, Form, Upload } from "antd";
import { useFormik } from "formik";
import React, { memo, useEffect } from "react";
import { importFlashCardAction } from "../../../redux/actions/LessonAction";
import { UploadOutlined } from "@ant-design/icons";
import { LOAD_MODAL } from "../../../redux/types/ModalHOCType";
import { useDispatch } from "react-redux";

const UploadFlashCardForm = memo(({ lesson_id }) => {
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
    }, [lesson_id]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            data: null,
            images: null,
            voices: null,
            lesson_id,
        },
        onSubmit: (values) => {
            let formData = new FormData();
            for (let key in values) {
                if (typeof values.data == "Bolb") {
                    formData.append(
                        key,
                        values[key].file,
                        values[key].file.name
                    );
                } else {
                    formData.append(key, values[key]);
                }
            }
            dispatch(importFlashCardAction(formData));
        },
    });

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(async () => {
            await formik.setFieldValue("data", file);
            onSuccess();
        }, 0);
    };

    const uploadImageHandle = ({ file, onSuccess }) => {
        setTimeout(async () => {
            await formik.setFieldValue("images", file);
            onSuccess();
        }, 0);
    };

    // const uploadVoiceHandle = ({ file, onSuccess }) => {
    //     setTimeout(async () => {
    //         await formik.setFieldValue("voices", file);
    //         onSuccess();
    //     }, 0);
    // };

    return (
        <div className="container">
            <Form
                wrapperCol={{
                    span: 10,
                }}
                labelCol={{
                    span: 8,
                }}
            >
                <Form.Item label="File Flash Card" required>
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
                <Form.Item label="File Images">
                    <Upload
                        name="images"
                        customRequest={uploadImageHandle}
                        maxCount={1}
                        accept=".zip, .rar"
                    >
                        <Button icon={<UploadOutlined />}>
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>

                {/* <Form.Item label="File Voices">
                    <Upload
                        name="voices"
                        customRequest={uploadVoiceHandle}
                        maxCount={1}
                        accept=".zip, .rar"
                    >
                        <Button icon={<UploadOutlined />}>
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item> */}
            </Form>
        </div>
    );
});

export default UploadFlashCardForm;
