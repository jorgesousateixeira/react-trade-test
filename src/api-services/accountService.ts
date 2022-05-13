import {getLoggedUserToken, handleError, getApiBaseUrl, getDefaultHeaders} from "./apiUtils";
import {ResultMessage} from "../models/resultMessage/resultMessage";


const getToken = (username: string, password: string) => {
    return fetch(getApiBaseUrl() + '/Tokens/GetTokenFromLogin?userId='+ username + '&password=' + password)
        .then(response => response.ok ? (response.json().then(result => result as ResultMessage<string>)) : null)
        .catch(handleError)
};

export default {
    getToken
};
  
