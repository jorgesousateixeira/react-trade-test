import {FC} from "react";
import {User} from "../../models/users/user";

interface UserDetailPresenterProps {
    user: User | undefined
}

const UserDetailsPresenter:FC<UserDetailPresenterProps> = ({user}) => {

    return (
        <>
            <div>{user?.ID}</div>
            <div>{user?.Name}</div>
            <div>{user?.Password}</div>
            <div>{user?.PasswordHashType}</div>
            <div>{user?.Status}</div>
            <div>{user?.Timezone}</div>
            {user?.Roles?.map(role => {
                return <div>{role.RoleId}</div>
            })}
        </>
    )
};

export default UserDetailsPresenter;
