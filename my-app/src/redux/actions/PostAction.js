import { apiDelete, apiGet, apiGet2, apiPost } from "../../helpers/apiHelper";
import { GET_POST, POST_LIST } from "../types/PostType";

export const getPostsAction = () => {
    return apiGet("/posts", POST_LIST);
};

export const getPostAction = (data) => {
    return apiGet2(`/post/${data}`, GET_POST);
};

export const savePostAction = (data) => {
    return apiPost("/post", data, getPostsAction);
};

export const deletePostsAction = (data) => {
    return apiDelete("/posts", data, getPostsAction);
};
