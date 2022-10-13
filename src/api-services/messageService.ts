import {getApiBaseUrl, getDefaultHeaders, handleError} from "./apiUtils";
import {SearchMessageCriteria} from "../models/messages/searchMessageCriteria";
import {TradeMessage} from "../models/messages/message";
import {ResultMessage} from "../models/resultMessage/resultMessage";

const searchMessages = (criteria: SearchMessageCriteria) => {
    let queryString = '';
    queryString += '?pageNumber=1';
    if (criteria.StartDate) {
        queryString += '&StartDate=' + criteria.StartDate;
    }
    if (criteria.Origin) {
        queryString += '&Origin=' + criteria.Origin;
    }
    return fetch(getApiBaseUrl() + '/Messages/PagedList' + queryString, {
        method: 'GET',
        headers: getDefaultHeaders()
    })
        .then(response => response.ok ? (response.json().then(result => result as ResultMessage<TradeMessage[]>)) : null)
        .catch(handleError)
};

const getMessageById = (id: string) => {
    return fetch(getApiBaseUrl() + '/Messages/GetById/' + id, {
        method: 'GET',
        headers: getDefaultHeaders()
    })
        .then(response => response.ok ? (response.json().then(result => result as ResultMessage<TradeMessage>)) : null)
        .catch(handleError)
};
const getMessageProcessing = (id: string) => {
    return fetch(getApiBaseUrl() + '/Messages/GetProcessing/' + id, {
        method: 'GET',
        headers: getDefaultHeaders()
    })
        .then(response => response.ok ? (response.json().then(result => result as ResultMessage<TradeMessage>)) : null)
        .catch(handleError)
};


export default {
    searchMessages,
    getMessageById,
    getMessageProcessing
};
