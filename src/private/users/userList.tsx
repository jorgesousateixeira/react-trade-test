
import {FC} from "react";
import {User} from "../../models/users/user";
import {DateHelper} from "../../helpers/dateHelper";
import {Link} from "react-router-dom";

interface UserListPops {
    users: User[];
}

const UserList: FC<UserListPops> = ({ users }) => {
    if (users.length) {
        return (
            <table className="minimal-table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Last login</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {users?.map(function (user, index) {
                    return (
                        <tr key={index}>
                            <td>
                                <Link to={{pathname: `/private/users/${user.ID}`}}>
                                    {user.ID}
                                </Link>
                            </td>
                            <td>{user.Name}</td>
                            <td>{DateHelper.convertFromServerSerialization(user.LastDatetimeLogin).toLocaleString('pt-PT', {timeZone: 'UTC'})}</td>
                            <td>{user.Status}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        );
    }
    return <></>

};

export default UserList;
