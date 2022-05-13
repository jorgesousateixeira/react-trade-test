import {useAppDispatch} from "../../app/hooks";
import {getTokenAsync, setActiveComponent} from "../../redux/loginSlice";
import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";

export function PrivateHome () {
    const dispatch = useAppDispatch();
    dispatch(setActiveComponent(NavigationModulesEnum.PrivateHome));

    return (
        <h1>Home</h1>
    )
}
