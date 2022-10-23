import {getApiBaseUrl, getDefaultHeaders, handleError} from "./apiUtils";
import {SearchMessageCriteria} from "../models/messages/searchMessageCriteria";
import {TradeMessage} from "../models/messages/message";
import {ResultMessage} from "../models/resultMessage/resultMessage";

const getSearchMessageQueryString = (criteria: SearchMessageCriteria): string => {
    let queryString = '';
    queryString += '?pageNumber=1';
    if (criteria.StartDate) {
        queryString += '&StartDate=' + encodeURIComponent(criteria.StartDate);
    }
    if (criteria.Origin) {
        queryString += '&Origin=' + criteria.Origin;
    }
    return queryString;
}
const getCountMessageQueryString = (criteria: SearchMessageCriteria): string => {
    const searMessageQueryString = getSearchMessageQueryString(criteria);
    return searMessageQueryString.replace(/pageNumber=[0-9]+&/,'');
}
const searchMessages = (criteria: SearchMessageCriteria) => {
    let queryString = getSearchMessageQueryString(criteria);
    const urlEncoded= getApiBaseUrl() + '/Messages/PagedList' + queryString;
    console.log(urlEncoded);
    return fetch(urlEncoded, {
        method: 'GET',
        headers: getDefaultHeaders()
    })
        .then(response => response.ok ? (response.json().then(result => result as ResultMessage<TradeMessage[]>)) : null)
        .catch(handleError)
};
const countMessages = (criteria: SearchMessageCriteria) => {
    let queryString = getCountMessageQueryString(criteria)
    const urlEncoded= getApiBaseUrl() + '/Messages/Count' + queryString;
    return fetch(urlEncoded, {
        method: 'GET',
        headers: getDefaultHeaders()
    })
        .then(response => response.ok ? (response.json().then(result => result as ResultMessage<number>)) : null)
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
    countMessages,
    getMessageById,
    getMessageProcessing
};
