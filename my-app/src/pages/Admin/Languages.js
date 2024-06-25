import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_COMPONENT } from "../../redux/types/PageType";
import { Tooltip, Button } from "antd";
import Swal from "sweetalert2";
import {
    deleteLanguagesAction,
    getLanguagesAction,
} from "../../redux/actions/LanguageAction";

const Languages = memo(() => {
    let { languages } = DataReducer((a) => a.LanguageReducer);
    let { selectedRowKeys } = useSelector((a) => a.PageReducer);
    const dispatch = useDispatch();
    const buttons = () => {
        return [
            <Button type="success" key={1} onClick></Button>,
            <Button
                key="2"
                type="danger"
                onClick={() => {
                    Swal.fire({
                        title: "Are you sure to delete these languages?",
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
                Xóa
            </Button>,
        ];
    };

    useEffect(() => {
        dispatch(getLanguagesAction());
        dispatch(
            {
                type: LOAD_COMPONENT,
                data: {
                    title: "Languages",
                    columns: [
                        {
                            title: "Language",
                            dataIndex: "name",
                            sortDirection: ["ascend", "descend"],
                            sorter: (a, b) =>
                                a.name.toLowerCase().trim() >
                                b.name.toLowerCase().trim(),
                        },
                        {
                            title: "Code",
                            dataIndex: "code",
                            // width: "20%",
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
                                                data-toggle="modal"
                                                data-target="#modelId"
                                                onClick={() => {
                                                    dispatch(
                                                        layThongTinPhimAction(
                                                            film.maPhim
                                                        )
                                                    );
                                                    const action = {
                                                        type: OPEN_FORM,
                                                        component: (
                                                            <MovieForm
                                                                edit={true}
                                                                maPhim={
                                                                    film.maPhim
                                                                }
                                                            />
                                                        ),
                                                        titleModal:
                                                            "Cập nhật phim",
                                                        maxWidth: 75,
                                                        typeModal: "",
                                                    };
                                                    dispatch(action);
                                                }}
                                            >
                                                <i className="bx bx-cog"></i>
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
                                                        title: "Are you sure to delete this language?",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        showConfirmButton: true,
                                                        confirmButtonText:
                                                            "Confirm",
                                                        cancelButtonText:
                                                            "Cancel",
                                                    }).then((result) => {
                                                        if (
                                                            result.isConfirmed
                                                        ) {
                                                            dispatch(
                                                                deleteLanguagesAction(
                                                                    [item.id]
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
                    dataSource: languages,
                    page: 1,
                    fetchData: getLanguagesAction,
                    buttons: buttons(),
                },
            },
            []
        );
        useEffect(() => {
            dispatch({
                type: LOAD_COMPONENT,
                data: {
                    dataSource: languages,
                },
            });
        }, [languages]);
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
});

export default Languages;
