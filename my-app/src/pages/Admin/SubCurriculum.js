import { Button, Tooltip } from "antd";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SubCurriculumForm from "../../components/forms/CurriculumForm/SubCurriculumForm";
import {
    deleteCurriculumsAction,
    getCurriculumAction,
    getCurriculumsAction,
} from "../../redux/actions/CurriculumAction";
import { GET_CURRICULUMN } from "../../redux/types/CurriculumType";
import { LOAD_MODAL } from "../../redux/types/ModalHOCType";
import { LOAD_COMPONENT } from "../../redux/types/PageType";

const SubCurriculum = memo(() => {
    let { curriculums } = useSelector((a) => a.CurriculumReducer);
    let { selectedRowKeys } = useSelector((a) => a.PageReducer);
    const params = useParams();
    const { parent_id } = params;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurriculumsAction(parent_id));
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                title: "Level",
                columns: [
                    {
                        title: "Name",
                        dataIndex: "name",
                    },
                    {
                        title: "",
                        dataIndex: "",
                        align: "right",
                        fixed: "right",
                        width: "200px",
                        render: (_, item, index) => {
                            return (
                                <React.Fragment>
                                    <Tooltip
                                        placement="top"
                                        title="Lesson"
                                        key={index + "3"}
                                    >
                                        <Link to={`/level/${item.id}`}>
                                            <button className="btn btn-primary ms-2">
                                                <i className="bx bx-list-ol"></i>
                                            </button>
                                        </Link>
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
                                                    type: GET_CURRICULUMN,
                                                    data: {
                                                        name: "",
                                                        description: "",
                                                        detail: "",
                                                        type: "",
                                                        price: "",
                                                        wallpaper: "",
                                                        id_parent: null,
                                                    },
                                                });
                                                dispatch(
                                                    getCurriculumAction(item.id)
                                                );
                                                const action = {
                                                    type: LOAD_MODAL,
                                                    data: {
                                                        titleModal:
                                                            "Edit level",
                                                        maxWidth: 40,
                                                        component: (
                                                            <SubCurriculumForm
                                                                parent_id={
                                                                    parent_id
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
                                                            deleteCurriculumsAction(
                                                                [item.id],
                                                                parent_id
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
                dataSource: curriculums.sort((a, b) => a.id - b.id),
                page: 1,
                fetchData: () => {
                    return getCurriculumsAction(parent_id);
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
                dataSource: curriculums.sort((a, b) => a.id - b.id),
            },
        });
    }, [curriculums]);

    useEffect(() => {
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                buttons: buttons(),
            },
        });
    }, [selectedRowKeys]);

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
                            title: "Are you sure to delete these levels?",
                            icon: "warning",
                            showCancelButton: true,
                            showConfirmButton: true,
                            confirmButtonText: "Confirm",
                            cancelButtonText: "Cancel",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                dispatch(
                                    deleteCurriculumsAction(
                                        selectedRowKeys,
                                        parent_id
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
                        type: GET_CURRICULUMN,
                        data: {
                            name: "",
                            id: null,
                        },
                    });
                    const action = {
                        type: LOAD_MODAL,
                        data: {
                            titleModal: "Create level",
                            maxWidth: 40,
                            component: (
                                <SubCurriculumForm parent_id={parent_id} />
                            ),
                        },
                    };
                    dispatch(action);
                }}
            >
                Create
            </Button>,
        ];
    };

    return <></>;
});

export default SubCurriculum;
