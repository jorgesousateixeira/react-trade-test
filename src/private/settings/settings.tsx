import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";
import { useContext, useEffect } from "react";
import { AppContext } from "../../shared/context/app.context";

export function Settings () {
    const [ AppValue, setAppValue ] = useContext(AppContext);
    AppValue.activeComponent = NavigationModulesEnum.Settings;
    useEffect(() => { setAppValue({...AppValue}); }, []);

    return (
        <h1>Settings</h1>
    )
}
