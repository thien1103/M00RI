import { Button } from "antd";
import { useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";

export default function ModalHOC() {
    const { component, handleSubmit, titleModal, maxWidth } = useSelector(
        (rootReducer) => rootReducer.ModalHOCReducer
    );

    return (
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div
                className="modal-dialog mx-auto"
                role="document"
                style={maxWidth ? { maxWidth: `${maxWidth}%` } : {}}
            >
                <div className="modal-content border-0">
                    <div className="modal-body px-0 pb-3">
                        <button
                            type="button"
                            className="btn close p-3 position-absolute end-0 display-3"
                            style={{ right: 0 }}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            id="closeModal"
                        >
                            <span
                                aria-hidden="true"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                &times;
                            </span>
                        </button>
                        <div className="headerForm d-flex align-items-center justify-content-center px-5 display-4 mb-5 border-bottom">
                            <img
                                src={logo}
                                alt=""
                                width={50}
                                height={50}
                                className="mt-2 mb-2"
                            />
                            <h2 className="px-3 mb-0">{titleModal}</h2>
                        </div>
                        {component}
                    </div>
                    <div className="modal-footer justify-content-center mt-3">
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            size="large"
                            className="btn btn-secondary ml-4"
                            data-bs-dismiss="modal"
                            id="closeModal"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
