import PrivateContainer from "../common/privateContainer";
import SearchBar from "../common/searchBar/searchBar";
import {setActiveComponent} from "../../redux/loginSlice";
import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {searchUsersAsync} from "../../redux/usersSlice";
import UserList from "./userList";
import {t} from "i18next";
import { useContext, useEffect } from "react";
import { AppContext } from "../../shared/context/app.context";

export function Users () {
    const [ AppValue, setAppValue ] = useContext(AppContext);
    AppValue.activeComponent = NavigationModulesEnum.Admin;
    useEffect(() => { setAppValue({...AppValue}); }, []);
    
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users.users);

    const performSearch = async (searchTerm: string) => {
        console.log('Performing user search: ' + searchTerm);

        const resultAction = await dispatch(searchUsersAsync(searchTerm));
        if (searchUsersAsync.fulfilled.match(resultAction)) {
            toast.info("Search users success...");
        } else {
            toast.error("Search users problem...");
            if (resultAction.payload) {
                //.. errors
            }
        }
    }

    return (
        <PrivateContainer title={t('users.title')}>
            <SearchBar handleSearch={performSearch} isMoreCriteriaOpen={false} handleToggle={()=>{console.log('handle toggle in users....')}}/>
            <UserList users= {users ? users : []} />
        </PrivateContainer>
    )
}

export default Users;
