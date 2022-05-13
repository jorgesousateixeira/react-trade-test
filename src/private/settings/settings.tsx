import {useAppDispatch} from "../../app/hooks";
import {setActiveComponent} from "../../redux/loginSlice";
import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";

export function Settings () {
    const dispatch = useAppDispatch();
    dispatch(setActiveComponent(NavigationModulesEnum.Settings));

    return (
        <h1>Settings</h1>
    )
}
