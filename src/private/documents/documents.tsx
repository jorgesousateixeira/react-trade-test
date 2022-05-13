import {useAppDispatch} from "../../app/hooks";
import {setActiveComponent} from "../../redux/loginSlice";
import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";

export function Documents () {
    const dispatch = useAppDispatch();
    dispatch(setActiveComponent(NavigationModulesEnum.Documents));
    return (
        <h1>Documents</h1>
    )
}
