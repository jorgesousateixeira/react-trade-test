import {useAppDispatch} from "../../app/hooks";
import {setActiveComponent} from "../../redux/loginSlice";
import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";
import {t} from "i18next";
import PrivateContainer from "../common/privateContainer";

export function Partners () {
    const dispatch = useAppDispatch();
    dispatch(setActiveComponent(NavigationModulesEnum.Partners));

    return (
        <PrivateContainer title={t('partners.title')}>
            <h1>Partners</h1>
        </PrivateContainer>
    )
}
