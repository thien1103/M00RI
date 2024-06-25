import { Button, Tooltip } from "antd";
import React, { memo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import LessonForm from "../../components/forms/CurriculumForm/LessonForm";
import UploadFlashCardForm from "../../components/forms/CurriculumForm/UploadFlashCardForm";
import UploadVocabularyForm from "../../components/forms/CurriculumForm/UploadVocabularyForm";
import {
    deleteLessonsAction,
    getLessonAction,
    getLessonsAction,
} from "../../redux/actions/LessonAction";
import { GET_LESSON } from "../../redux/types/LessonType";
import { LOAD_MODAL } from "../../redux/types/ModalHOCType";
import { LOAD_COMPONENT } from "../../redux/types/PageType";

const Lesson = memo(() => {
    const { lessons } = useSelector((a) => a.LessonReducer);
    let { selectedRowKeys } = useSelector((a) => a.PageReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const { level_id } = params;
    useEffect(() => {
        dispatch(getLessonsAction(level_id));
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                title: "Lessons",
                columns: [
                    {
                        title: "Name",
                        dataIndex: "name",
                    },
                    {
                        title: "Lesson unit",
                        dataIndex: "index",
                    },
                    {
                        title: "",
                        dataIndex: "",
                        align: "right",
                        fixed: "right",
                        width: "250px",
                        render: (_, item, index) => {
                            return (
                                <React.Fragment>
                                    {/* <Tooltip
                                        placement="top"
                                        title="Upload vocabulary"
                                        key={index + "3"}
                                    >
                                        <button
                                            className="btn btn-success ms-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => {
                                                const action = {
                                                    type: LOAD_MODAL,
                                                    data: {
                                                        titleModal:
                                                            "Import Vocabulary",
                                                        maxWidth: 40,
                                                        component: (
                                                            <UploadVocabularyForm
                                                                lesson_id={
                                                                    item.id
                                                                }
                                                            />
                                                        ),
                                                    },
                                                };
                                                dispatch(action);
                                            }}
                                        >
                                            <i className="fa-solid fa-file-arrow-up"></i>
                                        </button>
                                    </Tooltip> */}
                                    <Tooltip
                                        placement="top"
                                        title="Upload flash card"
                                        key={index + "4"}
                                    >
                                        <button
                                            className="btn btn-primary ms-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => {
                                                const action = {
                                                    type: LOAD_MODAL,
                                                    data: {
                                                        titleModal:
                                                            "Import Flash Card",
                                                        maxWidth: 40,
                                                        component: (
                                                            <UploadFlashCardForm
                                                                lesson_id={
                                                                    item.id
                                                                }
                                                            />
                                                        ),
                                                    },
                                                };
                                                dispatch(action);
                                            }}
                                        >
                                            <i className="fa-solid fa-vr-cardboard"></i>
                                        </button>
                                    </Tooltip>
                                    <Tooltip
                                        placement="top"
                                        title="Edit"
                                        key={index + "1"}
                                    >
                                        <button
                                            className="btn btn-warning ms-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => {
                                                dispatch({
                                                    type: GET_LESSON,
                                                    data: {
                                                        id: null,
                                                        name: "",
                                                        index: "",
                                                    },
                                                });
                                                dispatch(
                                                    getLessonAction(item.id)
                                                );
                                                const action = {
                                                    type: LOAD_MODAL,
                                                    data: {
                                                        titleModal:
                                                            "Edit lesson",
                                                        maxWidth: 40,
                                                        component: (
                                                            <LessonForm
                                                                level_id={
                                                                    level_id
                                                                }
                                                            />
                                                        ),
                                                    },
                                                };
                                                dispatch(action);
                                            }}
                                        >
                                            <i className="bx bxs-edit"></i>
                                        </button>
                                    </Tooltip>
                                    <Tooltip
                                        placement="top"
                                        title="Delete"
                                        key={index + "2"}
                                    >
                                        <button
                                            className="btn btn-danger ms-2"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: "Are you sure to delete this level?",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    showConfirmButton: true,
                                                    confirmButtonText:
                                                        "Confirm",
                                                    cancelButtonText: "Cancel",
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        dispatch(
                                                            deleteLessonsAction(
                                                                [item.id],
                                                                level_id
                                                            )
                                                        );
                                                    }
                                                });
                                            }}
                                        >
                                            <i className="bx bx-trash"></i>
                                        </button>
                                    </Tooltip>
                                </React.Fragment>
                            );
                        },
                    },
                ],
                dataSource: lessons.sort((a, b) => a.id - b.id),
                page: 1,
                fetchData: () => {
                    return getLessonsAction(level_id);
                },
                buttons: buttons(),
                selectedRowKeys: [],
            },
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                dataSource: lessons.sort((a, b) => a.id - b.id),
            },
        });
    }, [lessons]);

    const buttons = () => {
        return [
            <Button
                danger
                type="primary"
                className="me-2"
                key={1}
                onClick={() => {
                    if (selectedRowKeys.length) {
                        Swal.fire({
                            title: "Are you sure to delete these lessons?",
                            icon: "warning",
                            showCancelButton: true,
                            showConfirmButton: true,
                            confirmButtonText: "Confirm",
                            cancelButtonText: "Cancel",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                dispatch(
                                    deleteLessonsAction(
                                        selectedRowKeys,
                                        level_id
                                    )
                                );
                            }
                        });
                    }
                }}
            >
                Delete
            </Button>,
            <Button
                type="primary"
                key={2}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => {
                    dispatch({
                        type: GET_LESSON,
                        data: {
                            name: "",
                            id: null,
                            index: "",
                        },
                    });
                    const action = {
                        type: LOAD_MODAL,
                        data: {
                            titleModal: "Create lesson",
                            maxWidth: 40,
                            component: <LessonForm level_id={level_id} />,
                        },
                    };
                    dispatch(action);
                }}
            >
                Create
            </Button>,
        ];
    };

    useEffect(() => {
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                buttons: buttons(),
            },
        });
    }, [selectedRowKeys]);
    return <></>;
});

export default Lesson;
