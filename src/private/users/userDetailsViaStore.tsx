import {FC, useEffect, useState} from "react";
import {User} from "../../models/users/user";
import PrivateContainer from "../common/privateContainer";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {searchMessagesAsync} from "../../redux/messagesSlice";
import {getLoggedUserByIdAsync, getTokenAsync, setActiveComponent} from "../../redux/loginSlice";
import {toast} from "react-toastify";
import {getUserByIdAsync} from "../../redux/usersSlice";
import {SearchMessageCriteria} from "../../models/messages/searchMessageCriteria";
import UserDetailsPresenter from "./userDetailsPresenter";
import { NavigationModulesEnum } from "../../models/clientOnly/navigationModulesEnum";

const UserDetails = () => {
    let {id} = useParams();
    const dispatch = useAppDispatch();
    dispatch(setActiveComponent(NavigationModulesEnum.Users));

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
