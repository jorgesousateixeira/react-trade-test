import { Outlet } from 'react-router-dom';
import PrivateNavigation from "./navigation/privateNavigation";
import styles from './private.module.css'
import { getAppTheme } from "./../api-services/apiUtils";

export function PrivateContainer () {
    return (
        <div id="main" className={[styles.main, styles[getAppTheme()]].join(" ")}>
            <div className={styles.navigation}>
                <PrivateNavigation/>
            </div>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    )
}
