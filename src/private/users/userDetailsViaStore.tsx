import { useContext, useEffect} from "react";
import PrivateContainer from "../common/privateContainer";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getUserByIdAsync} from "../../redux/usersSlice";
import UserDetailsPresenter from "./userDetailsPresenter";
import { NavigationModulesEnum } from "../../models/clientOnly/navigationModulesEnum";
import { AppContext } from "../../shared/context/app.context";

const UserDetails = () => {
    const [ AppValue, setAppValue ] = useContext(AppContext);
    AppValue.activeComponent = NavigationModulesEnum.Users;
    useEffect(() => { setAppValue({...AppValue}); }, []);

    let {id} = useParams();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.users.user)

    // const [user, setUser] = useState<User|undefined>(undefined);
    console.log('Rendering UserDetails via store...' + JSON.stringify(user));



    useEffect(() => {
        if (id) {
            dispatch(getUserByIdAsync(id));
            // getUserById(id).then(()=>{ console.log('got user id: ' + id)});
        }
    },[id]);



    return (
        <PrivateContainer title="User details....">
            <UserDetailsPresenter user={user} />
        </PrivateContainer>

    );
};

export default UserDetails;
