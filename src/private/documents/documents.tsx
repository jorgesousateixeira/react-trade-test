import {useAppDispatch} from "../../app/hooks";
import {setActiveComponent} from "../../redux/loginSlice";
import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";
import PrivateContainer from "../common/privateContainer";
import {t} from "i18next";

export function Documents () {
    const dispatch = useAppDispatch();
    dispatch(setActiveComponent(NavigationModulesEnum.Documents));
    return (
        <PrivateContainer title={t('private.documents.title')}>
            <h1>Documents</h1>
        </PrivateContainer>
    )
}
