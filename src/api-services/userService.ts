import {getApiBaseUrl, getDefaultHeaders, handleError} from "./apiUtils";
import {ResultMessage} from "../models/resultMessage/resultMessage";
import {User} from "../models/users/user";

const getUserById = (Id: string) => {
    return fetch(getApiBaseUrl() + '/Users/GetById?id=' + Id, {
        method: 'GET',
        headers: getDefaultHeaders()
    })
        .then(response => response.ok ? (response.json().then(result => result as ResultMessage<User>)) : null)
        .catch(handleError)
};
const searchUsers = (Id: string) => {
    return fetch(getApiBaseUrl() + '/Users/List?Id=' + Id, {
        method: 'GET',
        headers: getDefaultHeaders()
    })
        .then(response => response.ok ? (response.json().then(result => result as ResultMessage<User[]>)) : null)
        .catch(handleError)
};


export default {
    getUserById,
    searchUsers
};
