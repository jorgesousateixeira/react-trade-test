import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";
import PrivateContainer from "../common/privateContainer";
import {t} from "i18next";
import { useContext, useEffect } from "react";
import { AppContext } from "../../shared/context/app.context";

export function Documents () {
    const [ AppValue, setAppValue ] = useContext(AppContext);
    AppValue.activeComponent = NavigationModulesEnum.Documents;
    useEffect(() => { setAppValue({...AppValue}); }, []);

    return (
        <PrivateContainer title={t('private.documents.title')}>
            <h1>Documents</h1>
        </PrivateContainer>
    )
}
