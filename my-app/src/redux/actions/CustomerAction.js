import { apiDelete, apiGet } from "../../helpers/apiHelper";
import { CUSTOMERS_LIST } from "../types/CustomerType";

export const getCustomersAction = () => {
    return apiGet("/customers", CUSTOMERS_LIST);
};

export const deleteCustomersAction = (data) => {
    return apiDelete("/customers", data, getCustomersAction);
};
