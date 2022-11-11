import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";
import { useContext, useEffect } from "react";
import { AppContext } from "../../shared/context/app.context";

export function PrivateHome () {
    const [ AppValue, setAppValue ] = useContext(AppContext);
    AppValue.activeComponent = NavigationModulesEnum.PrivateHome;
    useEffect(() => { setAppValue({...AppValue}); }, []);

    return (
        <h1>Home</h1>
    )
}
