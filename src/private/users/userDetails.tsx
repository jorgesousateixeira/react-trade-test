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

const UserDetailsViaUseEffect = () => {
    let {id} = useParams();
    const dispatch = useAppDispatch();
    dispatch(setActiveComponent(NavigationModulesEnum.Users));
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
