import * as localStorageKeys from '../local-storage/localStorageKeys'

// In a real app, would likely call an error logging service.
export function handleError(error: any) {
    // eslint-disable-next-line no-console
    console.error("API call failed. " + error);
    throw error;
}

export const getApiBaseUrl = () => 'https://saphetydoc-int.saphety.com/TradeBusinessWs';
export const getGlobalizationBaseUrl = () => 'https://doc-server-int.saphety.com/Doc.Globalization.WebApi/api';
export const getLoggedUserToken = () => localStorage.getItem(localStorageKeys.APP_LOGGED_USER_TOKEN);
export const getDefaultHeaders = () => { return { "content-type": "application/json", "Authorization": "Bearer " + getLoggedUserToken() }; }

