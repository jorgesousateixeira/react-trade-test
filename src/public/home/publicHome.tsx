import {Link} from "react-router-dom";

export function PublicHome () {
    return (
        <>
            <h1>Public home</h1>
            <Link to="/public/login">Login</Link>
        </>
)
}
