import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { loadLanguageGlobalizations } from './app/globalization';
import GlobalizationService from "./api-services/globalizationService";
import {getGlobalizationBaseUrl} from "./api-services/apiUtils";

const backendOptions = {
    allowMultiLoading: false,
    loadPath: getGlobalizationBaseUrl() + '/Resource/{{ns}}?lng={{lng}}',
    request: async (options, url, payload, callback) => {
        try {
            const lng = url.split("lng=")[1];
            let resources = await GlobalizationService.getGlobalizationResourcesByURL(url);
            resources = loadLanguageGlobalizations(resources?.Data, lng);
            callback(null, {
                data: resources,
                status: 200,
            });
        } catch (e) {
            console.error(e);
            callback(null, {
                status: 500,
            });
        }
    },
};

i18n
    .use(I18NextHttpBackend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        backend: backendOptions,
        fallbackLng: 'en',
        load: 'languageOnly',
        defaultNS: 'Trade-Client',
        fallbackNS: 'Trade-Client',
        ns: ['Trade-Client'],
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        react: {
            wait: true,
            useSuspense: false
        }
    });

export default i18n;
