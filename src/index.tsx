import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import {store} from './app/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {StyledEngineProvider} from '@mui/material/styles';
import {LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import './i18n';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <StyledEngineProvider injectFirst>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <App/>
                    </LocalizationProvider>
                </StyledEngineProvider>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
