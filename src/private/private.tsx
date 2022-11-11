import { Outlet } from 'react-router-dom';
import PrivateNavigation from "./navigation/privateNavigation";
import styles from './private.module.css'
import { useContext } from 'react';
import { AppContext } from '../shared/context/app.context';

export function PrivateContainer () {
    const [ AppValue ] = useContext(AppContext);
    
    return (
        <div id="main" className={[styles.main, styles[AppValue.theme.toLocaleLowerCase()]].join(" ")}>
            <div className={styles.navigation}>
                <PrivateNavigation/>
            </div>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    )
}
