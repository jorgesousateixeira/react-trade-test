import {useAppDispatch} from "../../app/hooks";
import {setActiveComponent} from "../../redux/loginSlice";
import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";
import {Link} from "react-router-dom";

export function Administration () {
    const dispatch = useAppDispatch();
    dispatch(setActiveComponent(NavigationModulesEnum.Admin));
    return (
        <>
            <h1>Administration</h1>
            <Link to="/private/users">Users</Link>
        </>
    )
}
