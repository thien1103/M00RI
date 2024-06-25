import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, DatePicker, Switch, Upload, Checkbox } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { LOAD_MODAL } from "../../../redux/types/ModalHOCType";
import { uploadVersionAction } from "../../../redux/actions/DataAction";

export default function DataForm() {
    const { form } = useSelector((a) => a.DataReducer);
    const dispatch = useDispatch();
    const normFile = (e) => {
        return e?.fileList;
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: form.name,
            newData: form.newData,
            translatedByGoogle: form.translatedByGoogle,
            data: null,
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
            dispatch(uploadVersionAction(formData));
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
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(async () => {
            await formik.setFieldValue("data", file);
            onSuccess();
        }, 0);
    };
    return (
        <div className="container">
            <Form
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 10,
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
                                readOnly={true}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Dữ liệu mới"
                            labelAlign="left"
                            className="justify-content-center"
                            name="newData"
                        >
                            <Checkbox
                                onChange={formik.handleChange}
                                checked={formik.values.newData}
                            ></Checkbox>
                        </Form.Item>
                        <Form.Item
                            label="Dịch bởi google"
                            labelAlign="left"
                            className="justify-content-center"
                            name="translatedByGoogle"
                        >
                            <Checkbox
                                onChange={formik.handleChange}
                                checked={formik.values.translatedByGoogle}
                            ></Checkbox>
                        </Form.Item>
                        <Form.Item
                            label="Dragger"
                            required
                            className="justify-content-center"
                            labelAlign="left"
                        >
                            <Form.Item
                                name="dragger"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                noStyle
                            >
                                <Upload.Dragger
                                    name="files"
                                    // action="/upload.do"
                                    customRequest={dummyRequest}
                                    maxCount={1}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click or drag file to this area to
                                        upload
                                    </p>
                                    <p className="ant-upload-hint">
                                        Support for a single upload.
                                    </p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    );
}
