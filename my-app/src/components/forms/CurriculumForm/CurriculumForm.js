import { Form, Input, InputNumber, Select, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useFormik } from "formik";
import React, { memo, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createCurriculumAction,
    getCurriculumsAction,
    updateCurriculumAction,
} from "../../../redux/actions/CurriculumAction";
import { LOAD_MODAL } from "../../../redux/types/ModalHOCType";

const { Option } = Select;
const CurriculumForm = memo(() => {
    const { form } = useSelector((a) => a.CurriculumReducer);
    const dispatch = useDispatch();
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (form.wallpaper) {
            let name = form.wallpaper.split("/");
            name = name[name.length - 1];
            setFileList([
                {
                    uid: "-1",
                    name: "image.png",
                    status: "done",
                    url: form.wallpaper,
                },
            ]);
        } else {
            setFileList([]);
        }
    }, [form.wallpaper]);

    const onChangeImage = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const uploadImage = ({ file, onSuccess }) => {
        setTimeout(async () => {
            await formik.setFieldValue("wallpaper", file);
            onSuccess();
        }, 0);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: form.id,
            name: form.name,
            description: form.description,
            detail: form.detail,
            type: form.type,
            price: form.price,
            wallpaper: form.wallpaper,
            id_parent: null,
        },
        onSubmit: (values) => {
            let formData = new FormData();
            for (let key in values) {
                if (key === "wallpaper" && typeof values.data == "Bolb") {
                    formData.append(
                        key,
                        values[key].file,
                        values[key].file.name
                    );
                } else if (key === "type") {
                    let type = null;
                    switch (values[key]) {
                        case "free":
                            type = 1;
                            break;
                        case "new":
                            type = 2;
                            break;
                        case "pro":
                            type = 3;
                            break;
                        default:
                            break;
                    }
                    formData.append(key, type);
                } else {
                    formData.append(key, values[key]);
                }
            }
            dispatch(
                values.id
                    ? updateCurriculumAction(formData)
                    : createCurriculumAction(formData)
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
            <Form layout="vertical">
                <div className="row">
                    <div className="col-md-6">
                        <Form.Item label="Name" required labelAlign="left">
                            <Input
                                placeholder="Name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                name="name"
                            />
                        </Form.Item>
                        <Form.Item label="Price" labelAlign="left">
                            <InputNumber
                                width={"100%"}
                                placeholder="Price"
                                // onChange={formik.handleChange}
                                onChange={(value) => {
                                    formik.setFieldValue("price", value);
                                }}
                                value={formik.values.price}
                                name="price"
                            />
                        </Form.Item>
                        <Form.Item label="Illustrator" labelAlign="left">
                            <Upload
                                // action="http://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChangeImage}
                                onPreview={onPreview}
                                beforeUpload={(file) => {
                                    return (
                                        file.type === "image/png" ||
                                        file.type === "image/jpeg"
                                    );
                                }}
                                customRequest={uploadImage}
                            >
                                {fileList.length < 1 && "+ Upload"}
                            </Upload>
                        </Form.Item>
                    </div>
                    <div className="col-md-6">
                        <Form.Item label="Type" labelAlign="left">
                            <Select
                                value={formik.values.type}
                                onChange={(value) => {
                                    formik.setFieldValue("type", value);
                                }}
                                placeholder="Loại giáo trình"
                                name="type"
                                defaultValue={2}
                            >
                                <Option value="new">New</Option>
                                <Option value="pro">Pro</Option>
                                <Option value="free">Free</Option>
                                <Option value={null}>None</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Description" labelAlign="left">
                            <TextArea
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                name="description"
                            ></TextArea>
                        </Form.Item>
                        <Form.Item label="Detail" labelAlign="left">
                            <TextArea
                                value={formik.values.detail}
                                onChange={formik.handleChange}
                                name="detail"
                            ></TextArea>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    );
});

export default CurriculumForm;
