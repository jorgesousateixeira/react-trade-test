import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";
import {t} from "i18next";
import PrivateContainer from "../common/privateContainer";
import { useContext, useEffect } from "react";
import { AppContext } from "../../shared/context/app.context";

export function Partners () {
    const [ AppValue, setAppValue ] = useContext(AppContext);
    AppValue.activeComponent = NavigationModulesEnum.Partners;
    useEffect(() => { setAppValue({...AppValue}); }, []);

    return (
        <PrivateContainer title={t('partners.title')}>
            <h1>Partners</h1>
        </PrivateContainer>
    )
}
