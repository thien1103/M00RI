import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_COMPONENT } from "../../redux/types/PageType";
import { Tooltip, Button } from "antd";
import Swal from "sweetalert2";
import {
    deletePostsAction,
    getPostAction,
    getPostsAction,
} from "../../redux/actions/PostAction";
import { LOAD_MODAL } from "../../redux/types/ModalHOCType";
import PostForm from "../../components/forms/PostForm/PostForm";

const Post = memo(() => {
    let { posts } = useSelector((a) => a.PostReducer);
    let { selectedRowKeys } = useSelector((a) => a.PageReducer);
    const dispatch = useDispatch();
    const buttons = () => {
        return [
            <Button
                type="primary"
                key={1}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => {
                    const action = {
                        type: LOAD_MODAL,
                        data: {
                            titleModal: "Create post",
                            maxWidth: 65,
                            component: <PostForm edit={false} />,
                        },
                    };
                    dispatch(action);
                }}
            >
                Create
            </Button>,
            <Button
                className="ms-2"
                key="2"
                type="danger"
                onClick={() => {
                    Swal.fire({
                        title: "Are you sure to delete these posts?",
                        icon: "warning",
                        showCancelButton: true,
                        showConfirmButton: true,
                        confirmButtonText: "Confirm",
                        cancelButtonText: "Cancel",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dispatch(deletePostsAction(selectedRowKeys));
                        }
                    });
                }}
            >
                Delete
            </Button>,
        ];
    };

    useEffect(() => {
        dispatch(getPostsAction());
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                title: "Posts",
                columns: [
                    {
                        title: "Title",
                        dataIndex: "name",
                        sortDirection: ["descend", "ascend"],
                        sorter: (a, b) =>
                            a.name.toLowerCase().trim() <
                            b.name.toLowerCase().trim(),
                    },
                    {
                        title: "Last Modified",
                        dataIndex: "updated_at",
                    },
                    {
                        title: "",
                        dataIndex: "",
                        align: "right",
                        width: "150px",
                        render: (_, item, index) => {
                            return (
                                <React.Fragment>
                                    <Tooltip
                                        placement="top"
                                        title="Edit"
                                        key={index + "1"}
                                    >
                                        <button
                                            className="btn btn-warning"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => {
                                                dispatch(
                                                    getPostAction(item.id)
                                                );
                                                const action = {
                                                    type: LOAD_MODAL,
                                                    data: {
                                                        titleModal: "Edit post",
                                                        maxWidth: 65,
                                                        component: (
                                                            <PostForm
                                                                edit={true}
                                                            />
                                                        ),
                                                    },
                                                };
                                                dispatch(action);
                                            }}
                                        >
                                            <i className="bx bxs-cog"></i>
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
                                                    title: "Are you sure to delete this post?",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    showConfirmButton: true,
                                                    confirmButtonText:
                                                        "Confirm",
                                                    cancelButtonText: "Cancel",
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        dispatch(
                                                            deletePostsAction([
                                                                item.id,
                                                            ])
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
                buttons: buttons(),
                selectedRowKeys: [],
            },
        });
    }, []);
    useEffect(() => {
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                dataSource: posts,
            },
        });
    }, [posts]);
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

export default Post;
