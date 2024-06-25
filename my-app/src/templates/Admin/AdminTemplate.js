import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./AdminTemplate.css";

import ThemeAction from "../../redux/actions/ThemeAction";
import Sidebar from "../../components/sidebar/Sidebar";
import TopNav from "../../components/topnav/TopNav";
import { ACCESSTOKEN } from "../../util/setting";
import { Navigate } from "react-router-dom";

import { Table } from "antd";
import { LOAD_COMPONENT } from "../../redux/types/PageType";

const AdminTemplate = (props) => {
    const themeReducer = useSelector((state) => state.ThemeReducer);

    let {
        title,
        columns,
        dataSource,
        selectedRowKeys,
        page,
        total,
        fetchData,
        buttons,
    } = useSelector((a) => a.PageReducer);
    dataSource = dataSource.map((item) => {
        return { ...item, key: item.id };
    });

    const dispatch = useDispatch();
    useEffect(() => {
        const themeClass = localStorage.getItem(
            "themeMode",
            "theme-mode-light"
        );

        const colorClass = localStorage.getItem(
            "colorMode",
            "theme-mode-light"
        );

        dispatch(ThemeAction.setMode(themeClass));

        dispatch(ThemeAction.setColor(colorClass));
    }, [dispatch]);

    if (!localStorage.getItem(ACCESSTOKEN)) {
        return <Navigate to="/login" />;
    }

    const onSelectChange = (selectedRowKeys) => {
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                selectedRowKeys,
            },
        });
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const handleTableChange = (event) => {
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                page: event.current,
            },
        });
        dispatch(fetchData());
    };

    return (
        <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
            <Sidebar {...props} />
            <div className="layout__content">
                <TopNav />
                <div className="layout__content-main">
                    {props.component}
                    <div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-between">
                                <h2 className="page-header">{title}</h2>
                                <div className="buttons">
                                    {buttons.map((item) => item)}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card__body">
                                        <Table
                                            rowSelection={rowSelection}
                                            columns={columns}
                                            dataSource={dataSource}
                                            pagination={{
                                                current: page,
                                                //   pageSize: pageSize,
                                                total,
                                            }}
                                            onChange={handleTableChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTemplate;
