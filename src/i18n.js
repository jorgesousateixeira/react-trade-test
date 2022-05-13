import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    appName : 'Trade admin',
                    users: {
                        title: 'Users'
                    },
                    messages: {
                        title: 'Messages'
                    },
                    loginPage: {
                        enterCredentials: 'Enter credentials...',
                        userName: 'User name',
                        password: 'Password',
                        btnLogin: 'Login',
                        backToPublicHome: 'Public home'
                    },
                    searchBar: {
                        defaultSearchBarLabel: "Search..."
                    },
                    description: {
                        part1: 'Edit <1>src/App.js</1> and save to reload.',
                        part2: 'Learn React'
                    }
                }
            },
            pt: {
                translation: {
                    appName : 'Trade admin',
                    users: {
                        title: 'Utilizadores'
                    },
                    messages: {
                        title: 'Mensagens'
                    },
                    loginPage: {
                        enterCredentials: 'Dados de acesso...',
                        userName: 'Utilizador',
                        password: 'Password',
                        btnLogin: 'Entrar',
                        backToPublicHome: 'Página inicial'
                    },
                    searchBar: {
                        defaultSearchBarLabel: "Pesquisar..."
                    },
                    description: {
                        part1: 'Edit <1>src/App.js</1> and save to reload.',
                        part2: 'Learn React'
                    }
                }
            }
        }
    });

export default i18n;
