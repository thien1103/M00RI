import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import "./Loading.css";

export default function Loading(props) {
    const { isLoading } = useSelector((a) => a.PageReducer);
    const antIcon = <LoadingOutlined className="loading-icon" spin />;
    return (
        <React.Fragment>
            {isLoading ? (
                <div className="loading">
                    <div>
                        <Spin indicator={antIcon} size="large" />
                    </div>
                </div>
            ) : (
                ""
            )}
        </React.Fragment>
    );
}
