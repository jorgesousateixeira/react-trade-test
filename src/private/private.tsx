import { Outlet } from 'react-router-dom';
import PrivateNavigation from "./navigation/privateNavigation";
import styles from './private.module.css'
export function PrivateContainer () {
    return (
        <div className={styles.main}>
            <div className={styles.navigation}>
                <PrivateNavigation/>
            </div>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    )
}
