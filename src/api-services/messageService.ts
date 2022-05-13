import {getApiBaseUrl, getDefaultHeaders, handleError} from "./apiUtils";
import {SearchMessageCriteria} from "../models/messages/searchMessageCriteria";
import {TradeMessage} from "../models/messages/message";
import {ResultMessage} from "../models/resultMessage/resultMessage";

const searchMessages = (criteria: SearchMessageCriteria) => {
    let queryString = '';
    if (criteria.StartDate) {
        queryString += '?StartDate=' + criteria.StartDate;
    }
    if (criteria.Origin) {
        queryString += '&Origin=' + criteria.Origin;
    }
    return fetch(getApiBaseUrl() + '/Messages/List' + queryString, {
        method: 'GET',
        headers: getDefaultHeaders()
    })
        .then(response => response.ok ? (response.json().then(result => result as ResultMessage<TradeMessage[]>)) : null)
        .catch(handleError)
};

export default {
    searchMessages
};
