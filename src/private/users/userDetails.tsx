import { useContext, useEffect, useState} from "react";
import {User} from "../../models/users/user";
import PrivateContainer from "../common/privateContainer";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {toast} from "react-toastify";
import {getUserByIdAsync} from "../../redux/usersSlice";
import UserDetailsPresenter from "./userDetailsPresenter";
import { NavigationModulesEnum } from "../../models/clientOnly/navigationModulesEnum";
import { AppContext } from "../../shared/context/app.context";

const UserDetailsViaUseEffect = () => {
    const [ AppValue, setAppValue ] = useContext(AppContext);
    AppValue.activeComponent = NavigationModulesEnum.Users;
    useEffect(() => { setAppValue({...AppValue}); }, []);
    const dispatch = useAppDispatch();

    let {id} = useParams();

    const [user, setUser] = useState<User|undefined>(undefined);
    console.log('Rendering UserDetails via useEffect...');

    useEffect(() => {
        if (id) {
            getUserById(id).then(()=>{ console.log('got user id: ' + id)});
        }
    },[]);


    async function getUserById(userId: string) {
        const resultAction = await dispatch(getUserByIdAsync(userId));
        if (getUserByIdAsync.fulfilled.match(resultAction)) {
            toast.info("got user success");
            setUser(resultAction.payload ? resultAction.payload.ResultData : undefined)
        } else {
            console.log('Could not get user..');
            toast.error("Could not get user...");
            if (resultAction.payload) {
                //.. errors
            }
        }
    }


    return (
        <PrivateContainer title="User details....">
            <UserDetailsPresenter user={user} />
        </PrivateContainer>

    );
};

export default UserDetailsViaUseEffect;
