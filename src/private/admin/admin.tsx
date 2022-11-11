import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";
import {Link} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../shared/context/app.context";

export function Administration () {
    const [ AppValue, setAppValue ] = useContext(AppContext);
    AppValue.activeComponent = NavigationModulesEnum.Admin;
    useEffect(() => { setAppValue({...AppValue}); }, []);

    return (
        <>
            <h1>Administration</h1>
            <Link to="/private/users">Users</Link>
        </>
    )
}
