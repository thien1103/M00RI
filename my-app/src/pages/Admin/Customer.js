import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteCustomersAction,
    getCustomersAction,
} from "../../redux/actions/CustomerAction";
import { LOAD_COMPONENT } from "../../redux/types/PageType";
import { Tooltip, Button } from "antd";
import Swal from "sweetalert2";

const Customer = memo(() => {
    let { customers } = useSelector((a) => a.CustomerReducer);
    let { selectedRowKeys } = useSelector((a) => a.PageReducer);
    const dispatch = useDispatch();
    const buttons = () => {
        return [
            <Button
                key="2"
                type="danger"
                onClick={() => {
                    Swal.fire({
                        title: "Are you sure to delete these customers?",
                        icon: "warning",
                        showCancelButton: true,
                        showConfirmButton: true,
                        confirmButtonText: "Confirm",
                        cancelButtonText: "Cancel",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dispatch(deleteCustomersAction(selectedRowKeys));
                        }
                    });
                }}
            >
                Delete
            </Button>,
        ];
    };
    useEffect(() => {
        dispatch(getCustomersAction());
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                title: "customers",
                columns: [
                    {
                        title: "Full name",
                        dataIndex: "name",
                        sortDirection: ["descend", "ascend"],
                        sorter: (a, b) =>
                            a.name.toLowerCase().trim() >
                            b.name.toLowerCase().trim(),
                    },
                    {
                        title: "Email",
                        dataIndex: "email",
                    },
                    // {
                    //     title: "User's language",
                    //     dataIndex: "user_language",
                    // },
                    {
                        title: "",
                        dataIndex: "",
                        align: "right",
                        width: "150px",
                        render: (_, customer, index) => {
                            return (
                                <React.Fragment>
                                    <Tooltip
                                        placement="top"
                                        title="Delete"
                                        key={index + "2"}
                                    >
                                        <button
                                            className="btn btn-danger ms-2"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: "Are you sure to delete this customer?",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    showConfirmButton: true,
                                                    confirmButtonText:
                                                        "Confirm",
                                                    cancelButtonText: "Cancel",
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        dispatch(
                                                            deleteCustomersAction(
                                                                [customer.id]
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
                dataSource: customers,
                page: 1,
                fetchData: getCustomersAction,
                buttons: buttons(),
                selectedRowKeys: [],
            },
        });
    }, []);
    useEffect(() => {
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                dataSource: customers,
            },
        });
    }, [customers]);
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

export default Customer;
