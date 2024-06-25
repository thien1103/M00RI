import Swal from "sweetalert2";

export const infoSuccess = (title = null, message = null) => {
    Swal.fire({
        title: title ? title : "Xử lý thành công",
        text: message ? message : null,
        icon: "success",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
    });
};

export const infoError = (
    title = null,
    message = null,
    callback = () => {}
) => {
    Swal.fire({
        title: title ? title : "Đã xảy ra lỗi, vui lòng thử lại",
        text: message ? message : null,
        icon: "error",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
    }).then((result) => {
        callback();
    });
};
