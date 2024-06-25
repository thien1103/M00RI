import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Tooltip, Button } from "antd";

import {
    generateNewNameAction,
    getVersionsAction,
} from "../../redux/actions/DataAction";
import { LOAD_COMPONENT } from "../../redux/types/PageType";
import { LOAD_MODAL } from "../../redux/types/ModalHOCType";
import DataForm from "../../components/forms/DataForm/DataForm";

const Data = memo(() => {
    const { versions } = useSelector((a) => a.DataReducer);
    const dispatch = useDispatch();
    const buttons = () => {
        return [
            <Button
                type="primary"
                key={1}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => {
                    dispatch(generateNewNameAction());
                    const action = {
                        type: LOAD_MODAL,
                        data: {
                            titleModal: "Update Database",
                            maxWidth: 40,
                            component: <DataForm />,
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
        dispatch(getVersionsAction());
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                title: "Từ vựng",
                columns: [
                    {
                        title: "Version",
                        dataIndex: "name",
                    },
                    {
                        title: "",
                        dataIndex: "",
                        align: "right",
                        width: "150px",
                        render: (_, item, index) => {
                            return (
                                <>
                                    <Tooltip
                                        key={index}
                                        title="Download"
                                        placement="top"
                                    >
                                        <a href={item.url}>
                                            <button className="btn btn-outline-success">
                                                <i className="bx bxs-download"></i>
                                            </button>
                                        </a>
                                    </Tooltip>
                                </>
                            );
                        },
                    },
                ],
                dataSource: versions,
                page: 1,
                fetchData: getVersionsAction,
                buttons: buttons(),
                selectedRowKeys: [],
            },
        });
    }, []);
    useEffect(() => {
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                dataSource: versions,
            },
        });
    }, [versions]);
    return <></>;
});

export default Data;
