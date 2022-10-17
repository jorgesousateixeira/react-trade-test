import styles from './privateNavigation.module.css'
import styles2 from '../common/privateContainer.module.css'

import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getTokenAsync} from "../../redux/loginSlice";
import {useAppSelector} from "../../app/hooks";
import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";
import PositionedMenu from "../common/menu";
import {User} from "../../models/users/user";
import * as localStorageKeys from "../../local-storage/localStorageKeys";
import useLocalStorage from "../../hooks/localStorageHook";

export default function PrivateNavigation() {
   // const activeComponent = useSelector((state:AppState) => state?.auth?.activeComponent);

    const [loggedUser, setLoggedUser] = useLocalStorage<User>(localStorageKeys.APP_LOGGED_USER, {} as User);

    const activeComponent = useAppSelector((state) => state.login.activeComponent)
    //let loggedUser = useAppSelector((state) => state.login.user)


/*    let loggedUser = undefined;
    const loggedUserStr = localStorage.getItem(localStorageKeys.APP_LOGGED_USER);
    if (loggedUserStr){
        loggedUser = JSON.parse(loggedUserStr);
    }*/

    return (
        <div className={[styles.navContainer, styles2.animatedFadein].join((" "))}>
            <div className={styles.appName}>Trade</div>
            <nav className={styles.nav}>
                <Link to="/private/home" className={activeComponent === NavigationModulesEnum.PrivateHome ? styles.active : ''}>
                    <span>Home</span>
                </Link>
                <Link to="/private/messages" className={activeComponent === NavigationModulesEnum.Messages ? styles.active : ''}>
                    <span>Messages</span>
                </Link>
                <Link to="/private/documents" className={activeComponent === NavigationModulesEnum.Documents ? styles.active : ''}>
                    <span>Documents</span>
                </Link>
                <Link to="/private/partners" className={activeComponent === NavigationModulesEnum.Partners ? styles.active : ''}>
                    <span>Partners</span>
                </Link>
                <Link to="/private/settings" className={activeComponent === NavigationModulesEnum.Settings ? styles.active : ''}>
                    <span>Settings</span>
                </Link>
                <Link to="/private/admin" className={activeComponent === NavigationModulesEnum.Admin ? styles.active : ''}>
                    <span>Admin</span>
                </Link>
            </nav>
            <div className={styles.userAndSignature}>
                <div className={styles.userArea}>
                    <PositionedMenu user={loggedUser} />
                </div>
                <div className={styles.signature}>
                    <a>www.saphety.com</a>
                </div>
            </div>
        </div>
    )
}
